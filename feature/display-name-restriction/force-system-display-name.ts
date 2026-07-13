import type { Handler } from "hydrooj";
import { type Context, DomainModel } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

const SYSTEM_DOMAIN_ID = "system" as const;

export function applyForceSystemDisplayName(ctx: Context) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ctx.on("user/get", async (user) => {
        if (!ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceSystemDisplayName))) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (user._dudoc.domainId !== SYSTEM_DOMAIN_ID) {
            const { displayName } = (await DomainModel.getDomainUser(SYSTEM_DOMAIN_ID, user._udoc)) as {
                displayName?: string;
            };
            if (displayName) {
                user.displayName = displayName;
            }
        }
    });

    ctx.on("handler/after/DomainUser#get", async (handler: Handler) => {
        if (!ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceSystemDisplayName))) {
            return;
        }

        const { rudocs } = handler.response.body as { rudocs: Record<string, { _id: number; displayName?: string }[]> };

        const users = (await DomainModel.getDomainUserMulti(
            SYSTEM_DOMAIN_ID,
            Object.values(rudocs)
                .flat()
                .map((d) => d._id),
        )
            .project(["uid", "displayName"])
            .toArray()) as { uid: number; displayName?: string }[];

        const uidDisplayNameMap = Object.fromEntries(users.map((d) => [d.uid, d.displayName]));

        Object.values(rudocs).forEach((udocs) => {
            udocs.forEach((udoc) => {
                udoc.displayName = uidDisplayNameMap[udoc._id] || udoc.displayName;
            });
        });
    });

    ctx.on("user/import/create", async (uid, udoc: { displayName?: string }) => {
        if (ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceSystemDisplayName)) && udoc.displayName) {
            await DomainModel.setUserInDomain(SYSTEM_DOMAIN_ID, uid, { displayName: udoc.displayName });
        }
    });

    const origGetListForRender = global.Hydro.model.user.getListForRender.bind(global.Hydro.model.user);

    global.Hydro.model.user.getListForRender = async function (
        ...args: Parameters<typeof global.Hydro.model.user.getListForRender>
    ) {
        const udict = await origGetListForRender(...args);
        if (!ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceSystemDisplayName))) {
            return udict;
        }

        const uids = Object.keys(udict).map((uid) => Number.parseInt(uid, 10));
        const systemUsers = DomainModel.getDomainUserMulti(SYSTEM_DOMAIN_ID, uids).project(["uid", "displayName"]);

        for await (const dudoc of systemUsers) {
            const { uid, displayName } = dudoc as { uid: number; displayName?: string };
            if (uid in udict && displayName) {
                udict[uid].displayName = displayName;
            }
        }

        return udict;
    } as typeof global.Hydro.model.user.getListForRender;
}
