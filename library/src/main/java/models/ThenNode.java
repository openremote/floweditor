package models;

import java.util.ArrayList;
import java.util.List;

public class ThenNode extends Node {

    InputProperty input;
    public OutputProperty output;

    public ThenNode(){

        List<InputProperty> inputs = new ArrayList<>();
        input = new InputProperty<>(this);

        inputs.add(input);

        output = new OutputProperty(this);
        List<OutputProperty> outputs = new ArrayList<>();
        outputs.add(output);

        setInputs(inputs);
        setOutputs(outputs);
    }

    public String getCondition(){
        return input.getProperty().getNode().toGroovy();
    }

    public String getAction(){
        return output.getInputProperty().getNode().toGroovy();
    }
    @Override
    public String toGroovy() {
       return "THEN NODE";
    }
}
