import { NodeCollection, GlobalRuleset, RulesetLang } from "@openremote/model";
import manager from "@openremote/core";
import { project } from "..";

export class Exporter {
    public flowToJson(collection: NodeCollection) {
        return JSON.stringify(collection);
    }

    public jsonToFlow(json: string): NodeCollection {
        return JSON.parse(json);
    }

    public exportAsNew(collection: NodeCollection) {
        const json = this.flowToJson(collection);
        const ruleApi = manager.rest.api.RulesResource;

        const rs: GlobalRuleset = {
            lang: RulesetLang.FLOW,
            name: collection.name,
            type: "global",
            rules: json
        };

        ruleApi.createGlobalRuleset(rs).then((e) => {
            if (e.status === 200) {
                project.setCurrentProject(e.data, collection.name, collection.description);
                console.log("Successfully saved new ruleset");
            } else {
                console.log("Something went wrong while saving NEW ruleset\nHTTP status " + e.status);
            }
        });
    }

    public exportAsExisting(id: number, collection: NodeCollection) {
        const json = this.flowToJson(collection);
        const ruleApi = manager.rest.api.RulesResource;
        ruleApi.getGlobalRuleset(project.existingFlowRuleId).then((response) => {
            const existing = response.data;
            existing.rules = json;
            ruleApi.updateGlobalRuleset(existing.id, existing).then((e) => {
                if (e.status === 204) {
                    project.unsavedState = false;
                    console.log("Successfully saved ruleset");
                } else {
                    console.log("Something went wrong while saving ruleset\nHTTP status " + e.status);
                }
            });
        });
    }
}
