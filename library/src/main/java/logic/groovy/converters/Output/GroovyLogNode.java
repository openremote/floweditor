package logic.groovy.converters.Output;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyLogNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return "LOG.warning((" + Groovify.toGroovy( node.getInputProperty("input").getConnectedProperty().getNode()) +
                ").toString())";
    }
}
