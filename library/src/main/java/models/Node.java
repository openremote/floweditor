package models;

import java.util.List;

public abstract class Node {

    private List<InputProperty> inputs;
    private List<OutputProperty> outputs;

    protected void setInputs(List<InputProperty> inputs) {
        this.inputs = inputs;
    }

    protected void setOutputs(List<OutputProperty> outputs) {
        this.outputs = outputs;
    }


    public void setInputReference(int index, OutputProperty value){
        inputs.get(index).setProperty(value);
    }


    public void setOutputReference(int index, InputProperty value){
        outputs.get(index).setInputProperty(value);
    }

    public OutputProperty getOutputProperty(int index){
        return outputs.get(index);
    }
    public InputProperty getInputProperty(int index){
        return inputs.get(index);
    }


    public abstract String toGroovy();
    public String pre(){
        return "";
    }
}

