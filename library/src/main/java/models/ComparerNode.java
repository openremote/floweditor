package models;

import java.util.ArrayList;
import java.util.List;

public class ComparerNode<T> extends Node {

    InputProperty<T> input1;
    InputProperty<T> input2;
    private String comparer;

    public ComparerNode(){

        List<InputProperty> inputs = new ArrayList<>();
        input1 = new InputProperty<>(this);
        input2 = new InputProperty<>(this);
        inputs.add(input1);
        inputs.add(input2);

        List<OutputProperty> outputs = new ArrayList<>();
        outputs.add(new OutputProperty<Boolean>(this));

        setInputs(inputs);
        setOutputs(outputs);
    }

    @Override
    public String toGroovy(){
        return input1.getProperty().getNode().toGroovy() + comparer +  input2.getProperty().getNode().toGroovy();
    }

    public String getComparer() {
        return comparer;
    }

    public void setComparer(String comparer) {
        this.comparer = comparer;
    }
}
