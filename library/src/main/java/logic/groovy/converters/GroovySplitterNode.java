package logic.groovy.converters;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;

public class GroovySplitterNode implements GroovyConverter {

    public String toCode(Node node) {
        String a = Groovify.toGroovy(node.getOutputProperty("output 1").getConnectedProperty().getNode());
        String b = Groovify.toGroovy(node.getOutputProperty("output 2").getConnectedProperty().getNode());
        return "\n " + a + "\n" + b + "\n";
    }
}
