package logic.groovy.converters.Output;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import logic.StandardNode;
import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyAttributeSaverNode implements GroovyConverter
{
    @Override
    public String toCode(Property property) throws RuleLibraryException
    {
        Node node = property.getNode();
        Gson gson = new Gson();
        Object assetAttributePair = node.getInternalValue("Attribute");
        JsonObject conv = gson.toJsonTree(assetAttributePair).getAsJsonObject();

        Property connected = node.getInputProperty("value").getConnectedProperty();

        return "facts.updateAssetState(\n\t" +
                conv.get("assetId") + ", " + conv.get("attributeName") + ", " + Groovify.toGroovy(connected) + "\n" +
                ");";
    }
}
