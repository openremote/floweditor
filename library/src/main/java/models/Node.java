package models;

import java.util.ArrayList;
import java.util.List;

public abstract class Node {

    private List<Property> inputs;
    private List<Property> outputs;
    private NodeType nodeType;

    protected void init( int inputAmount, int outputAmount){

        inputs = new ArrayList<>();
        for (int i = 0; i < inputAmount; i++) {
            inputs.add(new Property(this));
        }
        outputs = new ArrayList<>();
        for (int i = 0; i < outputAmount; i++) {
            outputs.add(new Property(this));
        }
    }

    protected void setInputs(List<Property> inputs) {
        this.inputs = inputs;
    }

    protected void setOutputs(List<Property> outputs) {
        this.outputs = outputs;
    }


    public void setInputReference(int index, Property value){
        inputs.get(index).setConnectedProperty(value);
    }


    public void setOutputReference(int index, Property value){
        outputs.get(index).setConnectedProperty(value);
    }

    public Property getOutputProperty(int index){
        return outputs.get(index);
    }
    public Property getInputProperty(int index){
        return inputs.get(index);
    }

}

