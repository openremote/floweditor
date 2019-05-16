package logic.groovy.converters.Processor;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyComparatorNode implements GroovyConverter {

    @Override
    public String toCode(Property property) throws RuleLibraryException {
        Node node = property.getNode();
        String first = Groovify.toGroovy(node.getInputProperty("input 1").getConnectedProperty());
        String second = Groovify.toGroovy(node.getInputProperty("input 2").getConnectedProperty());
        String middle = node.getInternalValue("operator").toString();
        return first + middle + second;

    }
}
