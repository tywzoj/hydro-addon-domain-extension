import { type Context, DomainModel } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

export function applyForceSystemDisplayName(ctx: Context) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ctx.on("user/get", async (user) => {
        if (!ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceSystemDisplayName))) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (user._dudoc.domainId !== "system") {
            const { displayName } = (await DomainModel.getDomainUser("system", user._udoc)) as { displayName?: string };
            if (displayName) {
                user.displayName = displayName;
            }
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
        const systemUsers = DomainModel.getDomainUserMulti("system", uids).project(["uid", "displayName"]);

        for await (const dudoc of systemUsers) {
            const { uid, displayName } = dudoc as { uid: number; displayName?: string };
            if (uid in udict && displayName) {
                udict[uid].displayName = displayName;
            }
        }

        return udict;
    } as typeof global.Hydro.model.user.getListForRender;
}
