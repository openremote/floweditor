package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.nodes.LogNode;

public class GroovyLogNode implements GroovyConverter<LogNode> {

    @Override
    public String toGroovy(LogNode node) {
        return "LOG.warning(" + Groovify.toGroovy( node.getInputProperty(1).getConnectedProperty().getNode()) +
                ".toString())";
    }
}
