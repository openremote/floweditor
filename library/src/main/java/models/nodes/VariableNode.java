package models.nodes;

import models.Node;

public class VariableNode extends Node {

    private String name;
    private Integer defaultValue;

    public VariableNode(){
       init(1,2);
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
