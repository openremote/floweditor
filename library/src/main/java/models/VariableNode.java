package models;

import java.util.ArrayList;
import java.util.List;

public class VariableNode extends Node {

    private String name;
    private Integer defaultValue;
    private OutputProperty output;

    public VariableNode(){
        List<OutputProperty> outputs = new ArrayList<>();
        output = new OutputProperty(this);
        outputs.add(output);
        setOutputs(outputs);
    }

    @Override
    public String pre() {
      return  "            int " +name+ ";\n" +
              "            if(!facts.matchFirst(\"" +name+ "\").isPresent()){\n" +
              "                facts.put(\"" +name+ "\",(int)" +defaultValue.toString()+ ")\n" +
              "                " +name+ " = " +defaultValue.toString()+ "\n" +
              "            } else {\n" +
              "                " +name+ " = Integer.parseInt(facts.matchFirst(\"" +name+ "\").get().toString())\n" +
              "            }\n";
    }

    @Override
    public String toGroovy() {
        return name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(Integer defaultValue) {
        this.defaultValue = defaultValue;
    }
}
