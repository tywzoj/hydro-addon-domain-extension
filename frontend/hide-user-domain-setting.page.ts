import { $, addPage, AutoloadPage, NamedPage } from "@hydrooj/ui-default";

addPage(
    new AutoloadPage("hide-user-domain-setting", () => {
        if (UserContext && UserContext._id && UiContext.hideUserDomainSetting) {
            // The menu will be loaded when user first hovered on the menu,
            // so we need to use MutationObserver to wait for the menu to be loaded.
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        if (!(node instanceof HTMLElement)) {
                            continue;
                        }

                        const menu = node.querySelector?.("#menu-nav-user");
                        if (!menu) {
                            continue;
                        }

                        const $menuItem = $(menu).find("li.menu__item").has('a[href*="/home/settings/domain"]');

                        $menuItem.next(".menu__seperator").remove();
                        $menuItem.remove();

                        // The menu will be kept even if the user unhovers the menu,
                        // so we can disconnect the observer after we have removed the menu item.
                        observer.disconnect();
                        return;
                    }
                }
            });

            observer.observe(document.body, { childList: true });
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
