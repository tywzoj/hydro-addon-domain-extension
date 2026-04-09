import type { Handler } from "hydrooj";
import { type Context, PrivilegeError } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";
import { CE_String } from "./i18n";

export function applyDisableUserDomainProfileEdit(ctx: Context) {
    ctx.on("handler/before/HomeSettings", (handler: Handler) => {
        if (
            handler.args.category === "domain" &&
            ctx.setting.get(getSettingKeys(CE_ConfigKey.DisableUserEditDisplayname))
        ) {
            throw new PrivilegeError(CE_String.EditDomainProfile);
        }
    });
}
