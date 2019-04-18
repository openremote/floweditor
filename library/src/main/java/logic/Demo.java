package logic;

import logic.groovy.GroovyRuleGenerator;
import logic.groovy.NodeConverter;
import logic.nodeSetReader.NodeSetReader;
import logic.nodeTypeReader.NodeTypeCollection;
import models.NodeSet;
import models.exceptions.RuleLibraryException;

import java.io.Console;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class Demo {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

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

         final String ANSI_RED = "\u001B[31m";

        try {
            NodeSetReader setReader = new NodeSetReader(collection);
            NodeSet nodeSet = setReader.read(readFile("sample-node-sets/sample2.json"));
            GroovyRuleGenerator generator = new GroovyRuleGenerator(nodeSet);
            writeToFile(nodeSet.getName(), generator.generate());

        } catch (RuleLibraryException e) {
            System.out.println(ANSI_CYAN +"["+e.getOrigin().getClass().getSimpleName()+"] "+
                    ANSI_RESET + ANSI_RED +  e.getMessage() + ANSI_RESET);
        }




    }

    private static void writeToFile(String name, String ruleText) throws IOException {
        File f = new File(name +".groovy");
        f.createNewFile();
        FileWriter writer = new FileWriter(f);
        writer.write(ruleText);
        writer.close();
    }

}
