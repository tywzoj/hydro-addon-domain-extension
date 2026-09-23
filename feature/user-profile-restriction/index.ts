import { type Context, type Handler, PRIV } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

export function applyUserProfileRestriction(ctx: Context) {
    ctx.on("handler/before/UserDetail", (handler: Handler) => {
        if (ctx.setting.get(getSettingKeys(CE_ConfigKey.UserProfileRestriction))) {
            handler.checkPriv(PRIV.PRIV_USER_PROFILE);
        }
    });
}
