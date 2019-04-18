package logic.nodeSetReader;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import logic.nodeTypeReader.NodeTypeCollection;
import models.Property;
import models.exceptions.NodeSetReaderException;
import models.exceptions.RuleLibraryException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;



public class NodeSetReader {

    NodeTypeCollection typeCollection;

    public NodeSetReader(NodeTypeCollection typeCollection) {
        this.typeCollection = typeCollection;
    }




    public models.NodeSet read(String json) throws RuleLibraryException {
        NodeSet nodeSet;
        try {
            Gson gson = new Gson();
            nodeSet = gson.fromJson(json, NodeSet.class);
        } catch (JsonSyntaxException e){
            throw new RuleLibraryException("NodeSet JSON is malformed. GSON Exception:[" +
                    e.getCause().getMessage() +"]",this);
        }
        if(nodeSet.name ==null){
            throw  new RuleLibraryException("NodeSet JSON name cannot be null.",this);
        }
        if(nodeSet.nodes ==null){
            throw  new RuleLibraryException("NodeSet JSON could not read any nodes.",this);
        }


        HashMap<Integer, models.Node> nodesById = new HashMap<>();

        for (int i = 0; i < nodeSet.nodes.length; i++) {
            Node nodeRepresentation = nodeSet.nodes[i];
            models.Node node = typeCollection.instantiate(nodeRepresentation.type);
            if (nodeRepresentation.internals != null) {
                for (Internal internal : nodeRepresentation.internals) {
                    node.addInternal(internal.name, internal.value);
                }
            }
            nodesById.put(nodeRepresentation.id, node);
        }


        for (Connection connection : nodeSet.connections) {
            try {
                models.Node from = nodesById.get(connection.from.id);
                models.Node to = nodesById.get(connection.to.id);
                Property fromProperty = from.getOutputProperty(connection.from.name);
                Property toProperty = to.getInputProperty(connection.to.name);
                fromProperty.setConnectedProperty(toProperty);
                toProperty.setConnectedProperty(fromProperty);
            } catch (NullPointerException e){
                throw  new RuleLibraryException("NodeSet JSON connection " + connection.from.id + " -> " + connection.to.id
                        + " cant be because one of the id's does not exist",this);
            }
        }
        List<models.Node> nodes  = new ArrayList<>(nodesById.values());
        return new models.NodeSet(nodeSet.name,nodes);
    }
}
