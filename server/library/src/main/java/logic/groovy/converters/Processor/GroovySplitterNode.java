package logic.groovy.converters.Processor;

import logic.StandardNode;
import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;


@StandardNode
public class GroovySplitterNode implements GroovyConverter {

    @Override
    public String toCode(Property property) throws RuleLibraryException {
        Node node = property.getNode();
        String a = Groovify.toGroovy(node.getOutputProperty("output 1").getConnectedProperty());
        String b = Groovify.toGroovy(node.getOutputProperty("output 2").getConnectedProperty());
        return a + "\n" + b + "\n";
    }
}
