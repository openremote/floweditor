package logic;

import models.NodeSet;
import models.exceptions.RuleLibraryException;

public abstract class RuleGenerator {

    protected NodeSet nodeSet;

    protected RuleGenerator(NodeSet nodeSet) {
        this.nodeSet = nodeSet;
    }

    public abstract String generate() throws RuleLibraryException;


}

