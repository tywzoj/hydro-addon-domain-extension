import { type Context, type DomainDoc, type Handler, PERM, PRIV, UserModel } from "hydrooj";

import { CE_ConfigKey, getSettingKeys } from "../../common/config";

export function applyHideDomainInSearchResult(ctx: Context) {
    ctx.on("handler/after/DomainSearch#get", async (handler: Handler) => {
        if (!ctx.setting.get(getSettingKeys(CE_ConfigKey.HideNoPermDomainInSearchResult))) {
            return;
        }

        const ddocs = handler.response.body as DomainDoc[];
        const filtered: DomainDoc[] = await Promise.all(
            ddocs.map(async (ddoc) => {
                const udoc = await UserModel.getById(ddoc._id, handler.user._id);
                return udoc && (udoc.hasPerm(PERM.PERM_VIEW) || udoc.hasPriv(PRIV.PRIV_VIEW_ALL_DOMAIN)) && ddoc;
            }),
        ).then((res) => res.filter((ddoc): ddoc is DomainDoc => !!ddoc));

        handler.response.body = filtered;
    });
}
