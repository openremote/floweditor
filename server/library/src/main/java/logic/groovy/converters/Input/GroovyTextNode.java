package logic.groovy.converters.Input;

import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyTextNode implements GroovyConverter {


    @Override
    public String toCode(Property property) throws RuleLibraryException {

        Node node = property.getNode();
        return "\"" + node.getInternalValue("text").toString() + "\"" ;
    }
}