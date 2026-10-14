import type { Handler } from "hydrooj";
import { type Context, DomainModel } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

const ALLOW_INVITE_SETTING_KEY = "server.allowInvite";

export function applyForceManagedUserInDomain(ctx: Context) {
    ctx.on("user/import/create", async (uid) => {
        if (
            ctx.setting.get(ALLOW_INVITE_SETTING_KEY) &&
            ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceManagedUser)) &&
            ctx.domain
        ) {
            await DomainModel.setJoin(ctx.domain._id, uid, true);
        }
    });

    ctx.on("handler/after/DomainUser#get", (handler: Handler) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        handler.UiContext.forceManagedUser =
            ctx.setting.get(ALLOW_INVITE_SETTING_KEY) && ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceManagedUser));
    });

    ctx.on("handler/before/DomainUser#post", (handler: Handler) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (handler.request.body.operation !== "set_users") return;

        if (
            ctx.setting.get(ALLOW_INVITE_SETTING_KEY) &&
            ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceManagedUser))
        ) {
            handler.args.join = true;
        }
    });
}
