package models;

import models.exceptions.RuleLibraryException;

import java.util.ArrayList;
import java.util.List;

public class Node {

    private List<Property> inputs;
    private List<Property> outputs;
    private List<InternalVariable> internals;
    private NodeType nodeType;
    private String nodeName;

    public Node(String nodeName, NodeType nodeType) {

        inputs = new ArrayList<>();
        outputs = new ArrayList<>();
        internals = new ArrayList<>();
        this.nodeType = nodeType;
        this.nodeName = nodeName;
    }


    public void addInternal(String name, Object value) {
        internals.add(new InternalVariable(name, value));
    }

    public void addInputProperty(String name, PropertyType type) {
        inputs.add(new Property(this, name, type));
    }

    public void addOutputProperty(String name, PropertyType type) {
        outputs.add(new Property(this, name, type));
    }

    public Property getOutputProperty(String name) throws RuleLibraryException {
        for (Property property : outputs) {
            if (property.getName().equals(name)) {
                return property;
            }
        }
        throw new RuleLibraryException("Can't find output property with the name \'" + name + "\' on node " + this.nodeName, this);
    }

    public Object getInternalValue(String internalName) throws RuleLibraryException {
        InternalVariable internalVariable = getInternalVariable(internalName);
        Object value = internalVariable.getValue();
        if (value == null) {
            throw new RuleLibraryException("Internal " + internalName + " of " + nodeName + " has no value", this);
        }
        return value;
    }

    private InternalVariable getInternalVariable(String name) throws RuleLibraryException {
        for (InternalVariable internal : internals) {
            if (internal.getName().equals(name)) {
                return internal;
            }
        }
        throw new RuleLibraryException("Can't find internal variable with the name \'" + name + "\' on node " + this.nodeName, this);
    }

    public Property getInputProperty(String name) throws RuleLibraryException {
        for (Property property : inputs) {
            if (property.getName().equals(name)) {
                return property;
            }
        }

        throw new RuleLibraryException("Can't find input property with the name \'" + name + "\' on node " + this.nodeName, this);
    }

    public NodeType getNodeType() {
        return nodeType;
    }

    public String getNodeName() {
        return nodeName;
    }
}

