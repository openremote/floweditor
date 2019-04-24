package logic.groovy.converters.Input;

import logic.StandardNode;
import logic.groovy.GroovyConverter;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyAttributeNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        String assetName = node.getInternalVariable("Asset name").getValue().toString();
        String attributeName = node.getInternalVariable("Attribute name").getValue().toString();

        return "facts.matchFirstAssetState().name(" + assetName + ").attributeName("+attributeName+").get().value.get()";
    }
}
