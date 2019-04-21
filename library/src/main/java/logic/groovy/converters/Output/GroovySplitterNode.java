package logic.groovy.converters.Output;

import logic.StandardNode;
import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;
import models.exceptions.RuleLibraryException;


@StandardNode
public class GroovySplitterNode implements GroovyConverter {

    public String toCode(Node node) throws RuleLibraryException {
        String a = Groovify.toGroovy(node.getOutputProperty("output 1").getConnectedProperty().getNode());
        String b = Groovify.toGroovy(node.getOutputProperty("output 2").getConnectedProperty().getNode());
        return a + "\n" + b + "\n";
    }
}
