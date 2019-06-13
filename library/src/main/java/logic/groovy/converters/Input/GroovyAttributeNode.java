package logic.groovy.converters.Input;

import logic.StandardNode;
import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;


public class GroovyAttributeNode implements GroovyConverter {

    @Override
    public String toCode(Property property) throws RuleLibraryException {

        Node node = property.getNode();
        String assetName = "[asset]";
        String attributeName = "[attribute]";

        return "facts.matchFirstAssetState().name(\"" + assetName + "\").attributeName(\""+attributeName+"\").get().value.get()";
    }
}
