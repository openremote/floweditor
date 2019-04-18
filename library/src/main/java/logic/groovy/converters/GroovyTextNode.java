package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import models.Node;
import models.exceptions.RuleLibraryException;

public class GroovyTextNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return "\"" + node.getInternalVariable("text").getValue().toString() + "\"" ;
    }
}
