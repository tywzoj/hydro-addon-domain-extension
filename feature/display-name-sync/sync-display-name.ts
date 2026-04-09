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
}
