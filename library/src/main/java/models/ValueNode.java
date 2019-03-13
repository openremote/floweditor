package models;

import java.util.ArrayList;
import java.util.List;


public class ValueNode<T> extends Node {

    private T value;

    public ValueNode() {

        List<OutputProperty> outputProperties= new ArrayList<>();
        outputProperties.add(new OutputProperty<T>(this));
        setOutputs(outputProperties);
    }

    @Override
    public String toGroovy() {
        return value.toString();
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
