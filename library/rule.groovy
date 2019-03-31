//Rule created on 2019-03-31 14:23 using rule-library
 
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
.name("test")
.when(
{
facts -> 
            int counter;
            if(!facts.matchFirst("counter").isPresent()){
                facts.put("counter",(int)0)
                counter = 0
            } else {
                counter = Integer.parseInt(facts.matchFirst("counter").get().toString())
            }
counter<10.0
})
.then(
{
facts -> 

            int counter;
            if(!facts.matchFirst("counter").isPresent()){
                facts.put("counter",(int)0)
                counter = 0
            } else {
                counter = Integer.parseInt(facts.matchFirst("counter").get().toString())
            }

 LOG.warning(counter)
 facts.put("counter",counter+1)

})