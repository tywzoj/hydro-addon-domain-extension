import { type Context } from "hydrooj";

import { applyDisableUserDomainProfileEdit } from "./disable-user-domain-profile-edit";
import { applyI18n } from "./i18n";

export function applyDisplayNameSync(ctx: Context) {
    applyI18n(ctx);

    applyDisableUserDomainProfileEdit(ctx);
}
