package logic.groovy.converters.Input;

import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyTextNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return "\"" + node.getInternalVariable("text").getValue().toString() + "\"" ;
    }
}