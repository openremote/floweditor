package models;


public class InputProperty<T>  {

    private OutputProperty<T> property;
    private Node node;

    public InputProperty(Node node) {
        this.node = node;
    }

    public Node getNode() {
        return node;
    }

    public OutputProperty<T> getProperty() {
        return property;
    }

    public void setProperty(OutputProperty<T> property) {
        this.property = property;
    }


}

