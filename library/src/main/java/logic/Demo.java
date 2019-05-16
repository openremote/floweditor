package logic;

import logic.apiConnection.AssetModelRetriever;
import logic.groovy.GroovyRuleGenerator;
import logic.nodeSetReader.NodeSetReader;
import models.NodeSet;
import models.exceptions.RuleLibraryException;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Demo {



    public static void main(String[] args) throws IOException, ClassNotFoundException {

        AssetModelRetriever assetModelRetriever = new AssetModelRetriever();
        assetModelRetriever.getModels();
        StandardNodeTypeCollection typeCollection = new StandardNodeTypeCollection();

        try {
            NodeSetReader setReader = new NodeSetReader(typeCollection);
            NodeSet nodeSet = setReader.read(FileReader.read("sample-node-sets/sample2.json"));
            GroovyRuleGenerator generator = new GroovyRuleGenerator(nodeSet);
            String rule = generator.generate();
           // writeToFile("generated-rules/"+ nodeSet.getName(),rule);

        } catch (RuleLibraryException e) {
            e.printStackTrace();
            e.printNeatly();
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
