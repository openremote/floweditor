package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyVariableSaverNode implements GroovyConverter {

    @Override
    public String toCode(Node node) {
        return
                " facts.put(\"" + Groovify.toGroovy(node.getInputProperty("name").getConnectedProperty().getNode()) + "\","
                + Groovify.toGroovy(node.getInputProperty("value").getConnectedProperty().getNode())+ ")";
    }
}
