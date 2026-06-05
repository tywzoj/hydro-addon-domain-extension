import type { Context, Handler } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

const DEFAULT_ROLE_ID = "default" as const;

export function applyHideUnjoinedDefaultUsers(ctx: Context): void {
    ctx.on("handler/after/DomainUser#get", (handler: Handler) => {
        if (!ctx.setting.get(getSettingKeys(CE_ConfigKey.HideUnjoinedDefaultRoleUsers))) {
            return;
        }

        const { rudocs } = handler.response.body as { rudocs: Record<string, { join: boolean }[]> };

        if (rudocs[DEFAULT_ROLE_ID] && Array.isArray(rudocs[DEFAULT_ROLE_ID])) {
            rudocs[DEFAULT_ROLE_ID] = rudocs[DEFAULT_ROLE_ID].filter((udoc) => udoc.join);
        }
    });
}
