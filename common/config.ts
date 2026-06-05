import { Schema } from "hydrooj";

export const enum CE_ConfigKey {
    ForceSystemDisplayName = "force-system-display-name",
    DisableUserEditDisplayname = "disable-user-edit-displayname",
    HideNoPermDomainInSearchResult = "hide-no-perm-domain-in-search-result",
    HideUnjoinedDefaultRoleUsers = "hide-unjoined-default-role-users",
    CdnBypass = "cdn-bypass-list",
}

export const Config = Schema.object({
    [CE_ConfigKey.ForceSystemDisplayName]: Schema.boolean().description("Force system display name").default(false),
    [CE_ConfigKey.DisableUserEditDisplayname]: Schema.boolean()
        .description("Disable user edit display name")
        .default(false),
    [CE_ConfigKey.HideNoPermDomainInSearchResult]: Schema.boolean()
        .description("Hide domain in search result if user has no permission to view")
        .default(false),
    [CE_ConfigKey.HideUnjoinedDefaultRoleUsers]: Schema.boolean()
        .description("Hide unjoined users that have the default role in the domain user list")
        .default(false),
    [CE_ConfigKey.CdnBypass]: Schema.array(Schema.string()).description("List of CIDR or IP to bypass CDN").default([]),
}).description("Domain Extension Settings");

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const PACKAGE_NAME = (require("../package.json") as { name: string }).name;
export function getSettingKeys(key: CE_ConfigKey): string {
    return `${PACKAGE_NAME}.${key}`;
}
