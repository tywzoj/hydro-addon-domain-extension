import { $, addPage, AutoloadPage, NamedPage } from "@hydrooj/ui-default";

addPage(
    new AutoloadPage("hide-user-domain-setting", () => {
        if (UserContext && UserContext._id && UiContext.hideUserDomainSetting) {
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
