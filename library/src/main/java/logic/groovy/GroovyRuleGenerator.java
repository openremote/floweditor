package logic.groovy;

import logic.RuleGenerator;
import models.Node;
import models.NodeType;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

class GroovyFormatter {
    public String format(String code) {
        int indend = 0;

        StringBuilder oneLine = new StringBuilder();

        boolean lastWasSpace = false;
        for (int i = 0; i < code.length(); i++) {
            char c = code.charAt(i);
            if (c == '\t') {
               // oneLine.append(' ');
                continue;
            }
            if (c == '\n') {
                //oneLine.append(' ');
               //continue;
            }
            if (c == ' ' && lastWasSpace) {
                continue;

            }
            if(c == ' '){
                lastWasSpace = true;
                oneLine.append(c);
                continue;
            }
            lastWasSpace = false;
            oneLine.append(c);
        }

        StringBuilder formatted = new StringBuilder();
        for (int i = 0; i < oneLine.length(); i++) {

            char c = oneLine.charAt(i);
            if (c == '{') {
                indend++;
                //formatted.append("\n");

            }
            if (c == '}') {
                for (int j = 0; j < 2; j++) {
                    formatted.deleteCharAt(formatted.length()-1);
                }
                indend--;
            }
            if (c == '\n') {
                formatted.append(c);

                for (int j = 0; j < indend; j++) {
                    formatted.append("  ");
                }
                continue;
            }
            formatted.append(c);
        }

        return formatted.toString();

    }

}

public class GroovyRuleGenerator implements RuleGenerator {

    List<Node> nodes;


    @Override
    public void setNodes(List<Node> nodes) {
        this.nodes = nodes;
    }

    private Node getThenNode() {
        for (Node node : nodes) {
            if (node.getNodeType() == NodeType.Then) {
                return node;
            }
        }
        throw new IllegalArgumentException("No Then nodes");
    }

    @Override
    public String generate() {
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
                ".name(\"test\")\n" +
                ".when({\n" +
                "facts -> \n" +
                "");


        Node thenNode = getThenNode();
        nodes.remove(thenNode);
        for (Node node : nodes) {
            builder.append(Groovify.pre(node));
        }


        builder.append(Groovify.toGroovy(thenNode.getInputProperty("input").getConnectedProperty().getNode()));
        builder.append("\n})\n" +
                ".then(\n" +
                "{\n" +
                "facts -> \n");

        for (Node node : nodes) {
            builder.append(Groovify.pre(node));
        }

        builder.append(Groovify.toGroovy(thenNode.getOutputProperty("output").getConnectedProperty().getNode()));
        builder.append(
                "})");

        GroovyFormatter groovyFormatter = new GroovyFormatter();
        String formattedString =groovyFormatter.format(builder.toString());

        return formattedString;
    }
}
