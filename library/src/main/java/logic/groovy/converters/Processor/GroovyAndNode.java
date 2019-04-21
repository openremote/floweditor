package logic.groovy.converters.Processor;

import logic.StandardNode;
import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyAndNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return Groovify.toGroovy( node.getInputProperty("input 1").getConnectedProperty().getNode()) + " && " +
         Groovify.toGroovy( node.getInputProperty("input 1").getConnectedProperty().getNode());

    }
}

