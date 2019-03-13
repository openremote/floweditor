package models;

public class OutputProperty<T>  {

    private Node node;
    private InputProperty inputProperty;



    public OutputProperty(Node node) {
        this.node = node;
    }


    public Node getNode() {
        return node;
    }

    public InputProperty getInputProperty() {
        return inputProperty;
    }

    public void setInputProperty(InputProperty inputProperty) {
        this.inputProperty = inputProperty;
    }
}
