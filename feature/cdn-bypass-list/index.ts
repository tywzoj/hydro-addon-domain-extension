import { type Context, type Handler } from "hydrooj";
import ip from "ip";
import isCidr from "is-cidr";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

export function applyCdnBypass(ctx: Context) {
    ctx.on("handler/before", (handler: Handler) => {
        const bypassList = (ctx.setting.get(getSettingKeys(CE_ConfigKey.CdnBypass)) as string[]) ?? [];

        const ipAddress = handler.request.ip;
        const shouldBypass = bypassList.some((bypass) => {
            try {
                return (isCidr(bypass) && ip.cidrSubnet(bypass).contains(ipAddress)) || ip.isEqual(ipAddress, bypass);
            } catch {
                return false;
            }
        });

        if (shouldBypass) {
            handler.UiContext.cdn_prefix = "/";
        }
    });
}
