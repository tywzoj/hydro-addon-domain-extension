import type { Context, Handler } from "hydrooj";
import { PRIV, PrivilegeError } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";
import { CE_String } from "./i18n";

export function applyDisableUserDomainProfileEdit(ctx: Context) {
    ctx.on("handler/before/HomeSettings", (handler: Handler) => {
        if (
            handler.args.category === "domain" &&
            ctx.setting.get(getSettingKeys(CE_ConfigKey.DisableUserEditDisplayname))
        ) {
            if (handler.domain?._id !== "system" || !handler.user.hasPriv(PRIV.PRIV_EDIT_SYSTEM)) {
                throw new PrivilegeError(CE_String.EditDomainProfile);
            }
        }
    });
}
