package demo.rules

import org.openremote.manager.rules.RulesBuilder
import org.openremote.model.asset.AssetType
import org.openremote.model.query.AssetQuery
import org.openremote.model.rules.Assets

import java.util.logging.Logger

Logger LOG = binding.LOG
RulesBuilder rules = binding.rules
Assets assets = binding.assets

rules.add()
        .name("Set bar to foo on someAttribute")
        .description("An example rule that sets 'bar' on someAttribute when it is 'foo'")
        .when(
        { facts ->
            facts.matchFirstAssetState(
                    new AssetQuery().type(AssetType.THING).attributeValue("nightSceneTargetTemperature", 2)
            ).map { thing ->
                facts.bind("assetId", thing.id)
                true
            }.orElse(false)
        })
        .then(
        { facts ->
            facts.updateAssetState(
                    facts.bound("assetId") as String, "nightSceneTargetTemperature", 5
            )
        })