package models.nodes;

import models.Node;

public class OperatorNode extends Node {


    private String operator;

    public OperatorNode() {
        init(2, 1);
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }


}
