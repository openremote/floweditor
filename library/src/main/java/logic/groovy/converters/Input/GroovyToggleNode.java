package logic.groovy.converters.Input;

import logic.StandardNode;
import logic.groovy.GroovyConverter;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyToggleNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return node.getInternalVariable("value").getValue().toString();
    }
}
