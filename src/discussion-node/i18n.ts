import type { Context } from "hydrooj";

export const enum CE_String {
    CONFIG_NAME = "domain discussion node",
    CONFIG_DESC = "domain discussion description",
}

export const strings: Record<string, Record<CE_String, string>> = {
    zh: {
        [CE_String.CONFIG_NAME]: "讨论节点",
        [CE_String.CONFIG_DESC]: "设置域的讨论节点，留空则使用全局设置",
    },
    en: {
        [CE_String.CONFIG_NAME]: "Discussion Node",
        [CE_String.CONFIG_DESC]: "Set the discussion node for the domain, leave empty to use the global setting",
    },
};

export function applyI18n(ctx: Context) {
    for (const [lang, translations] of Object.entries(strings)) {
        ctx.i18n.load(lang, translations);
    }
}
