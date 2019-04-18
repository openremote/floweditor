package models;

import java.util.List;

public class NodeSet {

    private String name;
    private List<Node> nodes;

    public NodeSet(String name, List<Node> nodes) {
        this.name = name;
        this.nodes = nodes;
    }

    public List<Node> getNodes() {
        return nodes;
    }

    public String getName() {
        return name;
    }
}
