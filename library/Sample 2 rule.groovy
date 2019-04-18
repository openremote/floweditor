//Rule created on 2019-04-18 11:32 using rule-library
 
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
.name("Sample 2 rule")
.when({
	facts -> 
	float v1;
	if(!facts.matchFirst("v1").isPresent()){
		facts.put("v1",(float)0)
		v1 = 0
	} else {
		v1 = Float.parseFloat(facts.matchFirst("v1").get().toString())
	}
	float vd2;
	if(!facts.matchFirst("vd2").isPresent()){
		facts.put("vd2",(float)1)
		vd2 = 1
	} else {
		vd2 = Float.parseFloat(facts.matchFirst("vd2").get().toString())
	}
	vd2<1000.0
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
	float vd2;
	if(!facts.matchFirst("vd2").isPresent()){
		facts.put("vd2",(float)1)
		vd2 = 1
	} else {
		vd2 = Float.parseFloat(facts.matchFirst("vd2").get().toString())
	}
	facts.put("v1",vd2)
	facts.put("v2",v1+vd2)
	
	LOG.warning((vd2).toString())
})