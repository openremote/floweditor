package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.nodes.SplitterNode;

public class GroovySplitterNode implements GroovyConverter<SplitterNode> {
    public String toGroovy(SplitterNode node) {
        String a = Groovify.toGroovy(node.getOutputProperty(0).getConnectedProperty().getNode());
        String b = Groovify.toGroovy(node.getOutputProperty(1).getConnectedProperty().getNode());
        return "\n " + a + "\n" + b + "\n";
    }
}
