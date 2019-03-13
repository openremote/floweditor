import models.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Demo {

    public static void main(String[] args) throws IOException {

        VariableNode counter = new VariableNode();
        counter.setName("counter");
        counter.setDefaultValue(0);
        ThenNode thenNode = new ThenNode();

        ValueNode valueNode = new ValueNode();

        ComparerNode comparerNode = new ComparerNode();
        comparerNode.setInputReference(0, counter.getOutputProperty(0));
        comparerNode.setInputReference(1, valueNode.getOutputProperty(0));


        thenNode.setInputReference(0, comparerNode.getOutputProperty(0));
        SplitterNode splitterNode = new SplitterNode();

        thenNode.setOutputReference(0, splitterNode.getInputProperty(0));

        LogNode logNode = new LogNode();
        logNode.setInputReference(0, counter.getOutputProperty(0));
        splitterNode.setOutputReference(0, logNode.getInputProperty(0));

        VariableSaverNode saverNode = new VariableSaverNode();
        OperatorNode operatorNode = new OperatorNode();
        operatorNode.setOperator("+");
        ValueNode valueNode1 = new ValueNode();
        valueNode1.setValue(1);

        splitterNode.setOutputReference(1, saverNode.getInputProperty(0));
        saverNode.setInputReference(0, operatorNode.getOutputProperty(0));
        saverNode.setName("counter");
        operatorNode.setInputReference(0, counter.getOutputProperty(0));
        operatorNode.setInputReference(1, valueNode1.getOutputProperty(0));

        List<Node> nodes = new ArrayList<>();
        nodes.add(thenNode);
        nodes.add(counter);

        comparerNode.setComparer("<");
        valueNode.setValue(10);


        GroovyRuleGenerator converter = new GroovyRuleGenerator();
        converter.setNodes(nodes);
        String ruleText = converter.generate();
        writeToFile(ruleText);
    }

    private static void writeToFile(String ruleText) throws IOException {
        File f = new File("rule2.groovy");
        f.createNewFile();
        FileWriter writer = new FileWriter(f);
        writer.write(ruleText);
        writer.close();
    }

}
