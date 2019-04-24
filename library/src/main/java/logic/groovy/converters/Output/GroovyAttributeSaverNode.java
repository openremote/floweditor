package logic.groovy.converters.Output;

import logic.StandardNode;
import logic.groovy.GroovyConverter;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyAttributeSaverNode implements GroovyConverter {

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        return "[Not implemented]\n";
    }
}
