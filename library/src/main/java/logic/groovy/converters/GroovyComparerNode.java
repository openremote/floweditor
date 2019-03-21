package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.nodes.ComparerNode;
import models.nodes.LogNode;
import models.nodes.VariableNode;
import models.nodes.VariableSaverNode;

public class GroovyComparerNode implements GroovyConverter<ComparerNode> {

    @Override
    public String toGroovy(ComparerNode node) {
        return
                Groovify.toGroovy(node.getInputProperty(0).getConnectedProperty().getNode())
                + node.getComparer() +
                Groovify.toGroovy(node.getInputProperty(1).getConnectedProperty().getNode());
    }
}
