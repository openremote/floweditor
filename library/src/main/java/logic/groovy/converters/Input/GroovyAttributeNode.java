package logic.groovy.converters.Input;

import logic.StandardNode;
import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyAttributeNode implements GroovyConverter {

    @Override
    public String toCode(Property property) throws RuleLibraryException {

        Node node = property.getNode();
        String assetName = node.getInternalValue("Asset name").toString();
        String attributeName = node.getInternalValue("Attribute name").toString();

        return "facts.matchFirstAssetState().name(\"" + assetName + "\").attributeName(\""+attributeName+"\").get().value.get()";
    }
}
