package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyVariableNode implements GroovyConverter {

    @Override
    public String pre(Node node) {

        Object name = node.getInternalVariable("name").getValue();
        Object defaultValue = node.getInternalVariable("defaultValue").getValue();
        return  "            int " +name+ ";\n" +
                "            if(!facts.matchFirst(\"" +name+ "\").isPresent()){\n" +
                "                facts.put(\"" +name+ "\",(int)" +defaultValue.toString()+ ")\n" +
                "                " +name+ " = " +defaultValue.toString()+ "\n" +
                "            } else {\n" +
                "                " +name+ " = Integer.parseInt(facts.matchFirst(\"" +name+ "\").get().toString())\n" +
                "            }\n";    }

    @Override
    public String toCode(Node node) {
        String obj = node.getInternalVariable("name").getValue().toString();
        return  obj;
    }
}
