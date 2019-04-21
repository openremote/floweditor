package logic.nodeTypeReader;


import com.google.gson.Gson;
import logic.groovy.NodeConverter;
import models.Node;
import org.reflections.Reflections;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


public class NodeTypeCollection {

    private List<NodeData> nodeData;
    private NodeTypeReader nodeReader;

    public NodeTypeCollection() {
        nodeReader = new NodeTypeReader();
        nodeData = new ArrayList<>();
    }

    public NodeData getDataOf(String name){
        for (NodeData data : nodeData) {
            if(data.specs.name.equals(name)){
                return data;
            }
        }
        throw new IllegalArgumentException();
    }

    public Node instantiate(String name){
        NodeJSONSpecs specs = getDataOf(name).specs;

        Node node = new Node(name,specs.type);
        if(specs.inputs!=null) {
            for (Property input : specs.inputs) {
                node.addInputProperty(input.name);
            }
        }
        if(specs.outputs!=null) {
            for (Property output : specs.outputs) {
                node.addOutputProperty(output.name);
            }
        }
        return node;
    }

    public void registerNode(String jsonRepresentation){
        NodeData node = new NodeData();
        node.specs = NodeTypeReader.read(jsonRepresentation);
        node.converters = new ArrayList<>();
        nodeData.add(node);
    }

    private NodeData getNodeData(String name){
        for (NodeData node : nodeData) {
           if(node.specs.name.equals(name)){
               return node;
           }
        }
        return null;
    }


    public String[] getNodeSpecsAsJSON(){
        Gson gson = new Gson();
        String[] jsonData = new String[nodeData.size()];

        for (int i = 0; i < nodeData.size(); i++) {
            jsonData[i] = gson.toJson(nodeData.get(i).specs);
        }
        return jsonData;
    }

    public void registerNodeConverter(String nodeName, Class<? extends NodeConverter> converter){
        NodeData node = getNodeData(nodeName);
        node.converters.add(converter);
    }

}
