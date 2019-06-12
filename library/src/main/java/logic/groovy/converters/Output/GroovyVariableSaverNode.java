package logic.groovy.converters.Output;

import logic.groovy.Groovify;
import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;


@StandardNode
public class GroovyVariableSaverNode implements GroovyConverter {

    @Override
    public String toCode(Property property) throws RuleLibraryException {

        Node node = property.getNode();
        return
                "facts.put(" + node.getInternalValue("name").toString() + ","
                + Groovify.toGroovy(node.getInputProperty("value").getConnectedProperty())+ ")\n";
    }
}
