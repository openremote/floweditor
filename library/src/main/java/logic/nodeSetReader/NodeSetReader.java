package logic.nodeSetReader;

import com.google.gson.Gson;
import logic.nodeTypeReader.NodeTypeCollection;
import models.Property;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;



public class NodeSetReader {

    NodeTypeCollection typeCollection;

    public NodeSetReader(NodeTypeCollection typeCollection) {
        this.typeCollection = typeCollection;
    }

    public models.NodeSet read(String json) {
        Gson gson = new Gson();
        NodeSet nodeSet = gson.fromJson(json, NodeSet.class);


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
            models.Node from = nodesById.get(connection.from.id);
            models.Node to = nodesById.get(connection.to.id);
            Property fromProperty = from.getOutputProperty(connection.from.name);
            Property toProperty = to.getInputProperty(connection.to.name);
            fromProperty.setConnectedProperty(toProperty);
            toProperty.setConnectedProperty(fromProperty);
        }
        List<models.Node> nodes  = new ArrayList<>(nodesById.values());
        return new models.NodeSet(nodeSet.name,nodes);
    }
}
