package models;

import models.InputProperty;
import models.Node;
import models.OutputProperty;

import java.util.ArrayList;
import java.util.List;

public class SplitterNode extends Node {

    private InputProperty input;
    private OutputProperty output1;
    private OutputProperty output2;

    public SplitterNode() {
        List<InputProperty> inputs = new ArrayList<>();
        input = new InputProperty<>(this);

        inputs.add(input);

        List<OutputProperty> outputs = new ArrayList<>();
        output1 = new OutputProperty(this);
        output2 = new OutputProperty(this);

        outputs.add(output1);
        outputs.add(output2);

        setInputs(inputs);
        setOutputs(outputs);
    }

    @Override
    public String toGroovy() {
        String a = output1.getInputProperty().getNode().toGroovy();
        String b = output2.getInputProperty().getNode().toGroovy();
        return "\n " + a + "\n" + b + "\n";
    }
}
