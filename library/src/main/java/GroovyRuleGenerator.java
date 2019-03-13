import models.Node;
import models.ThenNode;

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
        throw new IllegalArgumentException("No Then node");
    }

    @Override
    public String generate() {
        StringBuilder builder = new StringBuilder();

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
        for (Node node : nodes) {
            builder.append(node.pre());
        }


        ThenNode thenNode = getThenNode();

        builder.append(thenNode.getCondition());
        builder.append("\n})\n" +
                ".then(\n" +
                "{\n" +
                "facts -> \n" +
                "\n");

        for (Node node : nodes) {
            builder.append(node.pre());
        }

        builder.append(thenNode.getAction());
        builder.append("\n" +
                "})");
        return builder.toString();
    }
}
