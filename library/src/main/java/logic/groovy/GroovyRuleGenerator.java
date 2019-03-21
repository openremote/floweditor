package logic.groovy;

import logic.RuleGenerator;
import models.Node;
import models.nodes.ThenNode;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class GroovyRuleGenerator implements RuleGenerator {

    List<Node> nodes;

    @Override
    public void setNodes(List<Node> nodes) {
        this.nodes = nodes;
    }

    private ThenNode getThenNode() {
        for (Node node : nodes) {
            if (node.getClass() == ThenNode.class) {
                return (ThenNode) node;
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
                ".when(\n" +
                "{\n" +
                "facts -> \n" +
                "");


        ThenNode thenNode = getThenNode();
        nodes.remove(thenNode);
        for (Node node : nodes) {
            builder.append(Groovify.pre(node));
        }


        builder.append(Groovify.toGroovy(thenNode.getConditionNode()));
        builder.append("\n})\n" +
                ".then(\n" +
                "{\n" +
                "facts -> \n" +
                "\n");

        for (Node node : nodes) {
            builder.append(Groovify.pre(node));
        }

        builder.append(Groovify.toGroovy(thenNode.getActionNode()));
        builder.append("\n" +
                "})");
        return builder.toString();
    }
}
