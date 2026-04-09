import { Schema } from "hydrooj";

export const enum CE_ConfigKey {
    ForceSystemDisplayName = "force-system-display-name",
    DisableUserEditDisplayname = "disable-user-edit-displayname",
}

export const Config = Schema.object({
    [CE_ConfigKey.ForceSystemDisplayName]: Schema.boolean().default(false),
    [CE_ConfigKey.DisableUserEditDisplayname]: Schema.boolean().default(false),
}).description("Domain Extension Settings");

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const PACKAGE_NAME = (require("../package.json") as { name: string }).name;
export function getSettingKeys(key: CE_ConfigKey): string {
    return `${PACKAGE_NAME}.${key}`;
}
