import type { Context } from "hydrooj";
import { DiscussionModel, Handler, SettingModel, yaml } from "hydrooj";

import { SETTING_FAMILY } from "../common/const";
import { applyI18n, CE_String } from "./i18n";

const DISCUSSION_NODE_SETTING_KEY = "discussion_node";

declare module "hydrooj" {
    interface DomainDoc {
        [DISCUSSION_NODE_SETTING_KEY]?: string;
    }

    class DomainDashboardHandler extends Handler {
        domain: DomainDoc;
        postInitDiscussionNode(firstArg: { domainId: string }, ...otherArgs: any[]): Promise<void>;
    }

    interface Context {
        withHandlerClass(
            handlerName: "DomainDashboardHandler",
            callback: (handler: typeof DomainDashboardHandler) => void,
        ): void;
    }
}

export function applyDiscussionNodeExtension(ctx: Context) {
    applyI18n(ctx);

    ctx.inject(["setting"], (ctx) => {
        ctx.setting.DomainSetting(
            SettingModel.Setting(
                SETTING_FAMILY,
                DISCUSSION_NODE_SETTING_KEY,
                null,
                "yaml",
                CE_String.CONFIG_NAME,
                CE_String.CONFIG_DESC,
            ),
        );
    });

    ctx.withHandlerClass("DomainDashboardHandler", (DomainDashboardHandler) => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const originalPostInitDiscussionNode = DomainDashboardHandler.prototype.postInitDiscussionNode;
        DomainDashboardHandler.prototype.postInitDiscussionNode = async function (...args) {
            const instance = this as InstanceType<typeof DomainDashboardHandler>;
            const [{ domainId }] = args;

            const domainDiscussionNodeSetting = instance.domain[DISCUSSION_NODE_SETTING_KEY];

            // Reference: https://github.com/hydro-dev/Hydro/blob/master/packages/hydrooj/src/handler/domain.ts
            const nodes =
                domainDiscussionNodeSetting &&
                (yaml.load(domainDiscussionNodeSetting) as
                    | Record<string, { name: string; pic?: string }[]>
                    | null
                    | undefined);

            if (!nodes) {
                // No custom discussion node setting in current domain, use original method to initialize discussion nodes
                return originalPostInitDiscussionNode.apply(instance, args);
            }

            await DiscussionModel.flushNodes(domainId);
            for (const category of Object.keys(nodes)) {
                for (const item of nodes[category]) {
                    const curr: unknown = await DiscussionModel.getNode(domainId, item.name);

                    if (!curr) {
                        await DiscussionModel.addNode(
                            domainId,
                            item.name,
                            category,
                            item.pic ? { pic: item.pic } : undefined,
                        );
                    }
                }
            }

            instance.back();
        };
    });
}
