package logic.groovy.converters.Output;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.exceptions.RuleLibraryException;


@StandardNode
public class GroovyVariableSaverNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return
                "facts.put(" + node.getInternalVariable("name").getValue().toString() + ","
                + Groovify.toGroovy(node.getInputProperty("value").getConnectedProperty().getNode())+ ")\n";
    }
}
