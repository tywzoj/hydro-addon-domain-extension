import { type Context } from "hydrooj";

import { applyDisableUserDomainProfileEdit } from "./disable-user-domain-profile-edit";
import { applyI18n } from "./i18n";
import { applyForceSystemDisplayName } from "./sync-display-name";

export function applyDisplayName(ctx: Context) {
    applyI18n(ctx);

    applyDisableUserDomainProfileEdit(ctx);
    applyForceSystemDisplayName(ctx);
}
