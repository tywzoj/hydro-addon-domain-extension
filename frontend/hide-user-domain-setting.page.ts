import { $, addPage, AutoloadPage, NamedPage } from "@hydrooj/ui-default";

addPage(
    new AutoloadPage("hide-user-domain-setting", () => {
        if (UserContext && UserContext._id && UiContext.hideUserDomainSetting) {
            const $menuItem = $("#menu-nav-user li.menu__item").has('a[href*="/home/settings/domain"]');
            $menuItem.next(".menu__seperator").remove();
            $menuItem.remove();
        }
    }),
);

addPage(
    new NamedPage(
        [
            "user_detail",
            "home_messages",
            "home_domain",
            "home_files",
            "home_account",
            "home_preference",
            "home_security",
        ],
        () => {
            if (UiContext.hideUserDomainSetting) {
                $("#menu-item-home_domain").remove();
            }
        },
    ),
);
