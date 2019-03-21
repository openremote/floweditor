package models.nodes;

import models.Node;
import models.NodeType;

public class ComparerNode extends Node {

    private String comparer;

    public ComparerNode(){
        init( 2,1);
    }

    public String getComparer() {
        return comparer;
    }

    public void setComparer(String comparer) {
        this.comparer = comparer;
    }
}
