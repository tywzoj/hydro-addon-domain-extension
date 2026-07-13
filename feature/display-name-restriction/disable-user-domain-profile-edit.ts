import type { Context, Handler } from "hydrooj";
import { PRIV, PrivilegeError } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";
import { CE_String } from "./i18n";

declare module "hydrooj" {
    export interface UiContext {
        hideUserDomainSetting?: boolean;
    }
}

export function applyDisableUserDomainProfileEdit(ctx: Context) {
    const checkDomainSettingDisabled = (handler: Handler): boolean => {
        return (
            (ctx.setting.get(getSettingKeys(CE_ConfigKey.DisableUserEditDisplayname)) as boolean) &&
            (handler.domain?._id !== "system" || !handler.user.hasPriv(PRIV.PRIV_EDIT_SYSTEM))
        );
    };

    ctx.on("handler/before", (handler) => {
        handler.UiContext.hideUserDomainSetting = checkDomainSettingDisabled(handler);
    });

    ctx.on("handler/before/HomeSettings", (handler: Handler) => {
        if (handler.args.category === "domain" && checkDomainSettingDisabled(handler)) {
            throw new PrivilegeError(CE_String.EditDomainProfile);
        }
    });
}
