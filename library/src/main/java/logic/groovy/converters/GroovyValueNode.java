package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import models.nodes.ValueNode;

public class GroovyValueNode implements GroovyConverter<ValueNode> {

    @Override
    public String toGroovy(ValueNode node) {
        return node.getValue().toString();
    }
}
