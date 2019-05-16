package logic.groovy.converters.Input;

import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

public class GroovyValueNode implements GroovyConverter {


    @Override
    public String toCode(Property property) throws RuleLibraryException {

        Node node = property.getNode();
        return node.getInternalValue("value").toString();
    }
}


