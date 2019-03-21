package models.nodes;

import models.Node;
import models.Property;

import java.util.ArrayList;
import java.util.List;

public class ThenNode extends Node {


    public ThenNode(){

       init(1,1);
    }

    public Node getConditionNode(){
        return  getInputProperty(0).getConnectedProperty().getNode();
    }

    public Node getActionNode(){
        return getOutputProperty(0).getConnectedProperty().getNode();
    }

}
