package logic.groovy.converters.Output;

import logic.StandardNode;
import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;


public class GroovyAttributeSaverNode implements GroovyConverter {


    @Override
    public String toCode(Property property) throws RuleLibraryException {
        Node node = property.getNode();
        return "[Not implemented]\n";
    }
}
