package logic.groovy.converters.Processor;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyOperatorNode implements GroovyConverter {

    @Override
    public String toCode(Property property) throws RuleLibraryException {
        Node node = property.getNode();
        String t = Groovify.toGroovy( node.getInputProperty("input 1").getConnectedProperty())
                + node.getInternalValue("operator") +
                Groovify.toGroovy(node.getInputProperty("input 2").getConnectedProperty());
        return t;
    }
}
