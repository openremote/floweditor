package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyComparatorNode implements GroovyConverter {

    @Override
    public String toCode(Node node) {
        String first = Groovify.toGroovy(node.getInputProperty("input 1").getConnectedProperty().getNode());
        String second = Groovify.toGroovy(node.getInputProperty("input 2").getConnectedProperty().getNode());
        String middle = node.getInternalVariable("operator").getValue().toString();
        return first + middle + second;

    }
}
