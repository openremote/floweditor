package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyLogNode implements GroovyConverter {

    @Override
    public String toCode(Node node) {
        return "LOG.warning(" + Groovify.toGroovy( node.getInputProperty("input").getConnectedProperty().getNode()) +
                ")";
    }
}
