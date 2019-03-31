package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyOperatorNode implements GroovyConverter {

    public String toCode(Node node){
        return Groovify.toGroovy( node.getInputProperty("input 1").getConnectedProperty().getNode())
                + node.getInternalVariable("logic").getValue() +
                Groovify.toGroovy(node.getInputProperty("input 2").getConnectedProperty().getNode());
    }
}
