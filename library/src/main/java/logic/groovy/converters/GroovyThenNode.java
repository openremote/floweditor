package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;

@StandardNode
public class GroovyThenNode implements GroovyConverter {

    @Override
    public String toCode(Node node) {
        return "THEN NODE";
    }
}
