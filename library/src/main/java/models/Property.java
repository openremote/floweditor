package models;


public class Property  {

    private Property connectedProperty;
    private Node node;
    private String name;


    public Property(Node node, String name) {
        this.node = node;
        this.name = name;
    }

    public Node getNode() {
        return node;
    }


    public Property getConnectedProperty() {
        return connectedProperty;
    }


    public void setConnectedProperty(Property connectedProperty) {
        this.connectedProperty = connectedProperty;
        connectedProperty.connectedProperty = this;
    }

    public String getName() {
        return name;
    }
}

