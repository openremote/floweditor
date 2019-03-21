package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import models.nodes.ValueNode;
import models.nodes.VariableNode;

public class GroovyVariableNode implements GroovyConverter<VariableNode> {

    @Override
    public String pre(VariableNode node) {
        return  "            int " +node.getName()+ ";\n" +
                "            if(!facts.matchFirst(\"" +node.getName()+ "\").isPresent()){\n" +
                "                facts.put(\"" +node.getName()+ "\",(int)" +node.getDefaultValue().toString()+ ")\n" +
                "                " +node.getName()+ " = " +node.getDefaultValue().toString()+ "\n" +
                "            } else {\n" +
                "                " +node.getName()+ " = Integer.parseInt(facts.matchFirst(\"" +node.getName()+ "\").get().toString())\n" +
                "            }\n";    }

    @Override
    public String toGroovy(VariableNode node) {
        return node.getName();
    }
}
