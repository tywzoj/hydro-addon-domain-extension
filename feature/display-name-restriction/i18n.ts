import type { Context } from "hydrooj";

export const enum CE_String {
    EditDomainProfile = "Edit User Profile in Domain",
}

const strings: Record<string, Record<CE_String, string>> = {
    zh: {
        [CE_String.EditDomainProfile]: "编辑域中个人资料",
    },
    zh_TW: {
        [CE_String.EditDomainProfile]: "編輯域中個人資料",
    },
};

export function applyI18n(ctx: Context) {
    for (const [lang, translations] of Object.entries(strings)) {
        ctx.i18n.load(lang, translations);
    }
}
