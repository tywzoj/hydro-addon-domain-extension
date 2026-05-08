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
