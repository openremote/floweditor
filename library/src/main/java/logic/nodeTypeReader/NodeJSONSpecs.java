package logic.nodeTypeReader;


import models.NodeType;

public class NodeJSONSpecs {
    public String name;
    public NodeType type;
    public NodeSpecProperty[] inputs;
    public NodeSpecProperty[] outputs;
    public Internal[] internals;

}
