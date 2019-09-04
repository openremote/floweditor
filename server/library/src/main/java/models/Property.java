package models;

import models.exceptions.RuleLibraryException;

public class Property
{
    private Property connectedProperty;
    private Node node;
    private String name;
    private PropertyType type;

    public Property(Node node, String name, PropertyType type)
    {
        this.node = node;
        this.name = name;
        this.type = type;
    }

    public Node getNode()
    {
        return node;
    }

    public Property getConnectedProperty() throws RuleLibraryException
    {
        return connectedProperty;
    }

    public void setConnectedProperty(Property connectedProperty)
    {
        this.connectedProperty = connectedProperty;
        connectedProperty.connectedProperty = this;
    }

    public String getName()
    {
        return name;
    }

    public PropertyType getType()
    {
        return type;
    }
}

