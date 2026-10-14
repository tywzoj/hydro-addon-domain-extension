import type { Handler } from "hydrooj";
import { type Context, DomainModel, PRIV } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

export function applyForceManagedUserInDomain(ctx: Context) {
    ctx.on("user/import/create", async (uid) => {
        if (ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceManagedUser)) && ctx.domain) {
            await DomainModel.setJoin(ctx.domain._id, uid, true);
        }
    });

    ctx.on("handler/after/DomainUser#get", (handler: Handler) => {
        handler.UiContext.forceManagedUser = !!ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceManagedUser));
    });

    ctx.on("handler/before/DomainUser#post", (handler: Handler) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (handler.request.body.operation !== "set_users") return;

        if (ctx.setting.get("server.allowInvite") || handler.user.hasPriv(PRIV.PRIV_MANAGE_ALL_DOMAIN)) {
            if (ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceManagedUser))) {
                handler.args.join = true;
            }
        }
    });
}
