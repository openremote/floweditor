package models;

import java.util.ArrayList;
import java.util.List;

public class OperatorNode extends Node {

    InputProperty input1;
    InputProperty input2;
    private String operator;

    public OperatorNode() {

        List<InputProperty> inputs = new ArrayList<>();
        input1 = new InputProperty<>(this);
        input2 = new InputProperty<>(this);

        inputs.add(input1);
        inputs.add(input2);

        List<OutputProperty> outputs = new ArrayList<>();
        outputs.add(new OutputProperty(this));

        setInputs(inputs);
        setOutputs(outputs);

    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    @Override
    public String toGroovy() {
        return input1.getProperty().getNode().toGroovy() + operator + input2.getProperty().getNode().toGroovy();
    }
}
