import { type Context } from "hydrooj";

import { applyDisableUserDomainProfileEdit } from "./disable-user-domain-profile-edit";
import { applyForceSystemDisplayName } from "./force-system-display-name";
import { applyI18n } from "./i18n";

export function applyDisplayNameRestriction(ctx: Context) {
    applyI18n(ctx);

    applyDisableUserDomainProfileEdit(ctx);
    applyForceSystemDisplayName(ctx);
}
