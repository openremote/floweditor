package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.nodes.VariableSaverNode;

public class GroovyVariableSaverNode implements GroovyConverter<VariableSaverNode> {

    @Override
    public String toGroovy(VariableSaverNode node) {
        return
                " facts.put(\"" + node.getName() + "\","
                + Groovify.toGroovy(node.getInputProperty(0).getConnectedProperty().getNode())+ ")";
    }
}
