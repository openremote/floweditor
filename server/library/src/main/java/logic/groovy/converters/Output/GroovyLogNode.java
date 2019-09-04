package logic.groovy.converters.Output;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyLogNode implements GroovyConverter {


    @Override
    public String toCode(Property property) throws RuleLibraryException {

        Node node = property.getNode();
        Property connected = node.getInputProperty("input").getConnectedProperty();
        return "LOG.warning((" + Groovify.toGroovy(connected) +
                ").toString())";
    }
}
