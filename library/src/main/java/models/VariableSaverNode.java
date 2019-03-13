package models;

import java.util.ArrayList;
import java.util.List;

public class VariableSaverNode extends Node {

    private String name;
    private InputProperty input1;


    public VariableSaverNode(){
        List<InputProperty> inputs = new ArrayList<>();
        input1 = new InputProperty<>(this);
        inputs.add(input1);

        List<OutputProperty> outputs = new ArrayList<>();

        setInputs(inputs);
        setOutputs(outputs);
    }

    @Override
    public String toGroovy() {
        return " facts.put(\"" +name+ "\"," + input1.getProperty().getNode().toGroovy() + ")";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
