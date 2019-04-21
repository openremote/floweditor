package logic.groovy.converters.Processor;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyOperatorNode implements GroovyConverter {

    public String toCode(Node node) throws RuleLibraryException {
        String t = Groovify.toGroovy( node.getInputProperty("input 1").getConnectedProperty().getNode())
                + node.getInternalVariable("operator").getValue() +
                Groovify.toGroovy(node.getInputProperty("input 2").getConnectedProperty().getNode());
        return t;
    }
}
