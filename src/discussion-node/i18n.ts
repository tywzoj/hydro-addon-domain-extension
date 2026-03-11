import type { Context } from "hydrooj";

export const enum CE_String {
    CONFIG_NAME = "domain discussion node",
    CONFIG_DESC = "domain discussion description",
}

export const strings: Record<string, Record<CE_String, string>> = {
    zh: {
        [CE_String.CONFIG_NAME]: "讨论节点",
        [CE_String.CONFIG_DESC]:
            "设置域的讨论节点，留空则使用全局设置。修改后在“管理域”选项卡中点击“初始化讨论节点”按钮以应用设置。",
    },
    zh_TW: {
        [CE_String.CONFIG_NAME]: "討論節點",
        [CE_String.CONFIG_DESC]:
            "設置域的討論節點，留空則使用全局設置。修改後在“管理域”選項卡中點擊“初始化討論節點”按鈕以應用設置。",
    },
    en: {
        [CE_String.CONFIG_NAME]: "Discussion Node",
        [CE_String.CONFIG_DESC]:
            "Set the discussion node for the domain, leave empty to use the global setting. After modification, click the 'Init Discussion Node' button in the 'Dashboard' tab to apply the settings.",
    },
};

export function applyI18n(ctx: Context) {
    for (const [lang, translations] of Object.entries(strings)) {
        ctx.i18n.load(lang, translations);
    }
}
