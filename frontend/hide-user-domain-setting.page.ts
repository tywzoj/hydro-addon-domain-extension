import { $, addPage, AutoloadPage, NamedPage } from "@hydrooj/ui-default";

addPage(
    new AutoloadPage("hide-user-domain-setting", () => {
        if (UserContext && UserContext._id && UiContext.hideUserDomainSetting) {
            const $menuItem = $(".nav__dropdown li.menu__item").has('a[href*="/home/settings/domain"]');
            $menuItem.next(".menu__seperator").remove();
            $menuItem.remove();
        }
    }),
);

addPage(
    new NamedPage([], () => {
        if (UiContext.hideUserDomainSetting) {
            $(".menu li.menu__item").has('a[href*="/home/settings/domain"]').remove();
        }
    }),
);
