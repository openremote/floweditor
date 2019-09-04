package logic.groovy.converters.Input;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import logic.StandardNode;
import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

import java.util.UUID;

@StandardNode
public class GroovyAttributeNode implements GroovyConverter
{
    @Override
    public String toCode(Property property) throws RuleLibraryException
    {
        Node node = property.getNode();
        Object assetAttributePair = node.getInternalValue("Attribute");
        Gson gson = new Gson();
        JsonObject conv = gson.toJsonTree(assetAttributePair).getAsJsonObject();
        String groovyToGetValue;
        String randomPredicateInputName = "v" + (int)Math.floor(Math.random()*8999 + 1000);

        switch (node.getOutputProperty("value").getConnectedProperty().getType())
        {
            case Number:
                groovyToGetValue = ".flatMap{% -> %.getValueAsNumber()}.orElse(0)";
                break;
            case String:
                groovyToGetValue = ".flatMap{% -> %.getValueAsString()}.orElse(\"null\")";
                break;
            case Boolean:
                groovyToGetValue = ".flatMap{% -> %.getValueAsBoolean()}.orElse(false)";
                break;
            case Any:
                groovyToGetValue = ".flatMap{% -> %.getValueAsObject()}.orElse(null)";
                break;
            default:
                groovyToGetValue = ".flatMap{% -> %.getValueAsString()}.orElse(\"null\")";
                break;
        }

        groovyToGetValue = groovyToGetValue.replace("%", randomPredicateInputName);

        return "facts.matchFirstAssetState(new AssetQuery().ids(" + conv.get("assetId") + ").attributeName(" + conv.get("attributeName") + "))" + groovyToGetValue;
    }
}
