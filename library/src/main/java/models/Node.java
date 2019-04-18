package models;

import java.util.ArrayList;
import java.util.List;

public class Node {

    private List<Property> inputs;
    private List<Property> outputs;
    private List<InternalVariable> internals;
    private NodeType nodeType;
    private String nodeName;

    public Node( String nodeName, NodeType nodeType) {

        inputs = new ArrayList<>();
        outputs = new ArrayList<>();
        internals = new ArrayList<>();
        this.nodeType = nodeType;
        this.nodeName = nodeName;
    }

    public void setInputReference(int index, Property value){
        inputs.get(index).setConnectedProperty(value);
    }

    public void addInternal(String name, Object value){
        internals.add(new InternalVariable(name,value));
    }

    public void addInputProperty(String name){
        inputs.add(new Property(this,name));
    }
    public void addOutputProperty(String name){
        outputs.add(new Property(this,name));
    }

    public void setInternal(String name, Object value){
        for (InternalVariable internal : internals) {
            if(internal.getName().equals(name)){
                internal.setValue(value);
                break;
            }
        }
        throw new IllegalArgumentException();
    }

    public void setOutputReference(int index, Property value){
        outputs.get(index).setConnectedProperty(value);
    }

    public Property getOutputProperty(String name){
        for (Property property : outputs) {
            if(property.getName().equals(name)){
                return property;
            }
        }
        throw new IllegalArgumentException();
    }

    public InternalVariable getInternalVariable(String name){
        for (InternalVariable internal : internals) {
            if(internal.getName().equals(name)){
               return internal;
            }
        }
        throw new IllegalArgumentException();
    }
    public Property getInputProperty(String name){
        for (Property property : inputs) {
            if(property.getName().equals(name)){
                return property;
            }
        }
        throw new IllegalArgumentException();
    }

    public NodeType getNodeType() {
        return nodeType;
    }

    public String getNodeName() {
        return nodeName;
    }
}

