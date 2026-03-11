import { type Context } from "hydrooj";

import { applyDiscussionNodeExtension } from "./discussion-node";

export function apply(ctx: Context) {
    applyDiscussionNodeExtension(ctx);
}
