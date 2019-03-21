package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;
import models.nodes.OperatorNode;
import models.nodes.SplitterNode;

public class GroovyOperatorNode implements GroovyConverter<OperatorNode> {

    public String toGroovy(OperatorNode node){
        return Groovify.toGroovy( node.getInputProperty(0).getConnectedProperty().getNode())
                + node.getOperator() +
                Groovify.toGroovy(node.getInputProperty(1).getConnectedProperty().getNode());
    }
}
