package logic.groovy.converters.Input;

import logic.groovy.GroovyConverter;
import logic.StandardNode;
import models.Node;
import models.exceptions.RuleLibraryException;

@StandardNode
public class GroovyVariableNode implements GroovyConverter {

    @Override
    public String pre(Node node) throws RuleLibraryException {

        Object name = node.getInternalVariable("name").getValue();
        Object defaultValue = node.getInternalVariable("defaultValue").getValue();
        return  "float " +name+ ";\n" +
                "if(!facts.matchFirst(\"" +name+ "\").isPresent()){\n" +
                "facts.put(\"" +name+ "\",(float)" +defaultValue.toString()+ ")\n" +
                name+ " = " +defaultValue.toString()+ "\n" +
                "} else {\n" +
                name+ " = Float.parseFloat(facts.matchFirst(\"" +name+ "\").get().toString())\n" +
                "}\n";    }

    @Override
    public String toCode(Node node) throws RuleLibraryException {
        String obj = node.getInternalVariable("name").getValue().toString();
        return  obj;
    }
}


