package models.nodes;

import models.Node;
import models.Property;

import java.util.ArrayList;
import java.util.List;


public class ValueNode<T> extends Node {

    private T value;

    public ValueNode() {

       init(0,1);
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
