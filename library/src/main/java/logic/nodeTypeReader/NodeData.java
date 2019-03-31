package logic.nodeTypeReader;

import logic.groovy.NodeConverter;

import java.util.List;

public class NodeData{
    NodeJSONSpecs specs;
    List<Class<? extends NodeConverter>> converters;
}
