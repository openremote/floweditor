package models;

import java.util.ArrayList;
import java.util.List;

public class LogNode extends Node {

    private InputProperty input1;


    public LogNode(){
        List<InputProperty> inputs = new ArrayList<>();
        input1 = new InputProperty<>(this);
        inputs.add(input1);

        List<OutputProperty> outputs = new ArrayList<>();

        setInputs(inputs);
        setOutputs(outputs);
    }

    @Override
    public String toGroovy() {
        return "LOG.warning(" + getInputProperty(0).getProperty().getNode().toGroovy() + ".toString())";
    }
}
