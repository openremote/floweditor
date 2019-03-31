package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyNumberNode implements GroovyConverter {

    @Override
    public String toCode(Node node) {
        return node.getInternalVariable("number").getValue().toString();
    }
}
