package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyNumberNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return node.getInternalVariable("number").getValue().toString();
    }
}
