import { type Context } from "hydrooj";

import { applyCommonI18n } from "./common/i18n";
import { applyDiscussionNodeExtension } from "./feature/discussion-node";
import { applyDisplayName } from "./feature/display-name";

export { Config } from "./common/config";

export function apply(ctx: Context) {
    applyCommonI18n(ctx);

    applyDiscussionNodeExtension(ctx);
    applyDisplayName(ctx);
}
