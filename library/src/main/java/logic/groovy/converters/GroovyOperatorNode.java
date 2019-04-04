package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyOperatorNode implements GroovyConverter {

    public String toCode(Node node){
        String t = Groovify.toGroovy( node.getInputProperty("input 1").getConnectedProperty().getNode())
                + node.getInternalVariable("operator").getValue() +
                Groovify.toGroovy(node.getInputProperty("input 2").getConnectedProperty().getNode());
        return t;
    }
}
