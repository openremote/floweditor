//Rule created on 2019-04-18 09:57 using rule-library
 
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
.name("null")
.when({
	facts -> 
	float v1;
	if(!facts.matchFirst("v1").isPresent()){
		facts.put("v1",(float)0)
		v1 = 0
	} else {
		v1 = Float.parseFloat(facts.matchFirst("v1").get().toString())
	}
	float v2;
	if(!facts.matchFirst("v2").isPresent()){
		facts.put("v2",(float)1)
		v2 = 1
	} else {
		v2 = Float.parseFloat(facts.matchFirst("v2").get().toString())
	}
	v2<1000.0
})
.then(
{
	facts -> 
	float v1;
	if(!facts.matchFirst("v1").isPresent()){
		facts.put("v1",(float)0)
		v1 = 0
	} else {
		v1 = Float.parseFloat(facts.matchFirst("v1").get().toString())
	}
	float v2;
	if(!facts.matchFirst("v2").isPresent()){
		facts.put("v2",(float)1)
		v2 = 1
	} else {
		v2 = Float.parseFloat(facts.matchFirst("v2").get().toString())
	}
	facts.put("v1",v2)
	facts.put("v2",v1+v2)
	
	LOG.warning((v2).toString())
})