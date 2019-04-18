package logic;

import models.NodeSet;

public abstract class RuleGenerator {

    protected NodeSet nodeSet;

    protected RuleGenerator(NodeSet nodeSet) {
        this.nodeSet = nodeSet;
    }

    public abstract String generate();


}

