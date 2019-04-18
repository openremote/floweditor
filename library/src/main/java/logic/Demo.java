package logic;

import logic.groovy.GroovyRuleGenerator;
import logic.groovy.NodeConverter;
import logic.nodeSetReader.NodeSetReader;
import logic.nodeTypeReader.NodeTypeCollection;
import models.NodeSet;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class Demo {
    /*
        public static void main(String[] args) throws IOException {

           Node counter_0 = new Node();
            counter_0.setInternal(0,"counter");
            counter_0.setInternal(1,0);
            Node thenNode_2 = new Node();

            Node valueNode_1 = new ValueNode();

            Node comparerNode_3 = new ComparerNode();
            comparerNode_3.setInputReference(0, counter_0.getOutputProperty(0));
            comparerNode_3.setInputReference(1, valueNode_1.getOutputProperty(0));


            thenNode_2.setInputReference(0, comparerNode_3.getOutputProperty(0));
            Node splitterNode_5 = new SplitterNode();

            thenNode_2.setOutputReference(0, splitterNode_5.getInputProperty(0));

            Node logNode_4 = new LogNode();
            logNode_4.setInputReference(1, counter_0.getOutputProperty(0));
            splitterNode_5.setOutputReference(0, logNode_4.getInputProperty(0));

            Node saverNode = new VariableSaverNode();
            Node operatorNode_6 = new OperatorNode();
            //operatorNode.setOperator("+");
            Node valueNode1 = new ValueNode();
            //valueNode1.setValue(1);

            splitterNode_5.setOutputReference(1, saverNode.getInputProperty(0));
            saverNode.setInputReference(0, operatorNode_6.getOutputProperty(0));
           // saverNode.setName("counter");
            operatorNode_6.setInputReference(0, counter_0.getOutputProperty(0));
            operatorNode_6.setInputReference(1, valueNode1.getOutputProperty(0));

            List<Node> nodes = new ArrayList<>();
            nodes.add(thenNode_2);
            nodes.add(counter_0);

           // comparerNode.setComparer("<");
           // valueNode.setValue(10);


            GroovyRuleGenerator converter = new GroovyRuleGenerator();
            converter.setNodes(nodes);
            String ruleText = converter.generate();
            writeToFile(ruleText);


        }
     */

    private static String readFile(String filePath) {
        StringBuilder contentBuilder = new StringBuilder();

        try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return contentBuilder.toString();
    }


    public static void main(String[] args) throws IOException, ClassNotFoundException {

        NodeTypeCollection collection = new NodeTypeCollection();
        String[] names = new String[]{
                "Comparator",
                "Log",
                "Splitter",

                "Variable",
                "Operator",
                "VariableSaver",
                "Number",
                "Text"
        };
        collection.registerNode(readFile("node-definitions/Then.json"));

        for (String name : names) {
            Class<?> type = Class.forName("logic.groovy.converters.Groovy" + name + "Node");
            collection.registerNode(readFile("node-definitions/" + name + ".json"));
            collection.registerNodeConverter(name, (Class<? extends NodeConverter>) type);
        }

        NodeSetReader setReader = new NodeSetReader(collection);
        NodeSet nodeSet = setReader.read(readFile("sample-node-sets/sample2.json"));

        GroovyRuleGenerator generator = new GroovyRuleGenerator(nodeSet);

        writeToFile(nodeSet.getName(), generator.generate());


    }

    private static void writeToFile(String name, String ruleText) throws IOException {
        File f = new File(name +".groovy");
        f.createNewFile();
        FileWriter writer = new FileWriter(f);
        writer.write(ruleText);
        writer.close();
    }

}
