import type { Handler } from "hydrooj";
import { type Context, DomainModel, OplogModel, UserModel } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

const ALLOW_INVITE_SETTING_KEY = "server.allowInvite";
const DEFAULT_ROLE = "default";

export function applyForceManagedUserInDomain(ctx: Context) {
    ctx.on("handler/after/SystemUserImport#post", async (handler: Handler) => {
        if (
            ctx.setting.get(ALLOW_INVITE_SETTING_KEY) &&
            ctx.setting.get(getSettingKeys(CE_ConfigKey.ForceManagedUser))
        ) {
            const uemails = (handler.response.body as { users: { email: string }[] }).users.map((user) => user.email);
            const udocs = await UserModel.getMulti({ email: { $in: uemails } }).toArray();
            const uids = udocs.map((user) => user._id);

            await Promise.all([
                DomainModel.setUserRole(handler.domain._id, uids, DEFAULT_ROLE, true),
                OplogModel.log(handler, "domain.setRole", {
                    uid: uids,
                    role: DEFAULT_ROLE,
                    join: true,
                    from: "user-import",
                }),
            ]);
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
