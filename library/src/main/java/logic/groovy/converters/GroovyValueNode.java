package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyValueNode implements GroovyConverter {

    @Override
    public String toCode(Node node) {
        return node.getInternalVariable("value").getValue().toString();
    }
}


