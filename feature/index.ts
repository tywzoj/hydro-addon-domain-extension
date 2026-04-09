import { type Context } from "hydrooj";

import { applyCommonI18n } from "./common/i18n";
import { applyDiscussionNodeExtension } from "./discussion-node";

export function apply(ctx: Context) {
    applyCommonI18n(ctx);

    applyDiscussionNodeExtension(ctx);
}
