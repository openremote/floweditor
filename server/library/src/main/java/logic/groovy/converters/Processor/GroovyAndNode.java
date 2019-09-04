package logic.groovy.converters.Processor;

import logic.StandardNode;
import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyAndNode implements GroovyConverter {

    @Override
    public String toCode(Property property) throws RuleLibraryException {
        Node node = property.getNode();
        return Groovify.toGroovy( node.getInputProperty("input 1").getConnectedProperty()) + " && " +
         Groovify.toGroovy( node.getInputProperty("input 2").getConnectedProperty());

    }
}

