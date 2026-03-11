import type { Context } from "hydrooj";

import { SETTING_FAMILY } from "./const";

export const strings: Record<string, Record<string, string>> = {
    zh: {
        [SETTING_FAMILY]: "域扩展设置",
    },
    en: {
        [SETTING_FAMILY]: "Domain Extension Settings",
    },
};

export function applyCommonI18n(ctx: Context) {
    for (const [lang, translations] of Object.entries(strings)) {
        ctx.i18n.load(lang, translations);
    }
}
