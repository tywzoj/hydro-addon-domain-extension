import { type Context } from "hydrooj";

import { applyCommonI18n } from "./common/i18n";
import { applyDiscussionNodeExtension } from "./feature/discussion-node";
import { applyDisplayNameRestriction } from "./feature/display-name-restriction";
import { applyHideUnjoinedDefaultUsers } from "./feature/hide-default-users";
import { applyHideDomainInSearchResult } from "./feature/hide-domaion";

export { Config } from "./common/config";

export function apply(ctx: Context) {
    applyCommonI18n(ctx);

    applyDiscussionNodeExtension(ctx);
    applyDisplayNameRestriction(ctx);
    applyHideUnjoinedDefaultUsers(ctx);
    applyHideDomainInSearchResult(ctx);
}
