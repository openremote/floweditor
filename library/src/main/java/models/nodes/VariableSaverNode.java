package models.nodes;

import models.Node;
import models.Property;

import java.util.ArrayList;
import java.util.List;

public class VariableSaverNode extends Node {

    private String name;


    public VariableSaverNode(){
       init(1,0);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
