package logic.groovy.converters.Input;

import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyVariableNode implements GroovyConverter {

    @Override
    public String pre(Node node) throws RuleLibraryException {

        Object name = node.getInternalValue("name");
        Object defaultValue = node.getInternalValue("defaultValue");
        return  "float " +name+ ";\n" +
                "if(!facts.matchFirst(\"" +name+ "\").isPresent()){\n" +
                "facts.put(\"" +name+ "\",(float)" +defaultValue.toString()+ ")\n" +
                name+ " = " +defaultValue.toString()+ "\n" +
                "} else {\n" +
                name+ " = Float.parseFloat(facts.matchFirst(\"" +name+ "\").get().toString())\n" +
                "}\n";    }


    @Override
    public String toCode(Property property) throws RuleLibraryException {

        Node node = property.getNode();
        String obj = node.getInternalValue("name").toString();
        return  obj;
    }
}


