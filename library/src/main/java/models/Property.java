package models;


public class Property  {

    private Property connectedProperty;
    private Node node;

    public Property(Node node) {
        this.node = node;
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
}

