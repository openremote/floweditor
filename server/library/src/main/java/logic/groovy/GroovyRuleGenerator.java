package logic.groovy;

import logic.RuleGenerator;
import models.Node;
import models.NodeSet;
import models.NodeType;
import models.exceptions.RuleLibraryException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class GroovyRuleGenerator extends RuleGenerator {


    public GroovyRuleGenerator(NodeSet nodeSet) {
        super(nodeSet);
    }


    private Node getThenNode() {
        for (Node node : nodeSet.getNodes()) {
            if (node.getNodeType() == NodeType.Then) {
                return node;
            }
        }
        throw new IllegalArgumentException("No Then nodes");
    }

    @Override
    public String generate() throws RuleLibraryException {
        StringBuilder builder = new StringBuilder();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm");
        String date = LocalDateTime.now().format(formatter);
        builder.append("//Rule created on " + date + " using rule-library");
        builder.append("\n \n");
        builder.append("package demo.rules\n" +
                "\n" +
                "import org.openremote.manager.rules.RulesBuilder\n" +
                "import org.openremote.model.asset.AssetType\n" +
                "import org.openremote.model.query.AssetQuery\n" +
                "import org.openremote.model.rules.Assets\n" +
                "\n" +
                "import java.util.logging.Logger\n" +
                "\n" +
                "Logger LOG = binding.LOG\n" +
                "RulesBuilder rules = binding.rules\n" +
                "Assets assets = binding.assets\n" +
                "\n" +
                "rules.add()\n" +
                ".name(\""+nodeSet.getName()+"\")\n" +
                ".when({\n" +
                "facts -> \n" +
                "");


        Node thenNode = getThenNode();
        nodeSet.getNodes().remove(thenNode);
        for (Node node : nodeSet.getNodes()) {
            builder.append(Groovify.pre(node));
        }


        builder.append(Groovify.toGroovy(thenNode.getInputProperty("input").getConnectedProperty()));
        builder.append("\n})\n" +
                ".then(\n" +
                "{\n" +
                "facts -> \n");

        for (Node node : nodeSet.getNodes()) {
            builder.append  (Groovify.pre(node));
        }

        builder.append(Groovify.toGroovy(thenNode.getOutputProperty("output").getConnectedProperty()));
        builder.append("})");

        GroovyFormatter groovyFormatter = new GroovyFormatter();
        String formattedString =groovyFormatter.format(builder.toString());

        return formattedString;
    }
}
