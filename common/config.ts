import { Schema } from "hydrooj";

export const enum CE_ConfigKey {
    ForceSystemDisplayName = "force-system-display-name",
    DisableUserEditDisplayname = "disable-user-edit-displayname",
    HideNoPermDomainInSearchResult = "hide-no-perm-domain-in-search-result",
}

export const Config = Schema.object({
    [CE_ConfigKey.ForceSystemDisplayName]: Schema.boolean().description("Force system display name").default(false),
    [CE_ConfigKey.DisableUserEditDisplayname]: Schema.boolean()
        .description("Disable user edit display name")
        .default(false),
    [CE_ConfigKey.HideNoPermDomainInSearchResult]: Schema.boolean()
        .description("Hide domain in search result if user has no permission to view")
        .default(false),
}).description("Domain Extension Settings");

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const PACKAGE_NAME = (require("../package.json") as { name: string }).name;
export function getSettingKeys(key: CE_ConfigKey): string {
    return `${PACKAGE_NAME}.${key}`;
}
