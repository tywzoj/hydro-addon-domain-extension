import { addPage, NamedPage } from "@hydrooj/ui-default";

addPage(
    new NamedPage("domain_user", () => {
        if (UiContext.forceManagedUser) {
            UiContext.canForceJoin = false;
        }
    }),
);
