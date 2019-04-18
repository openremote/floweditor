package logic.groovy;

import models.Node;
import models.exceptions.RuleLibraryException;

public interface NodeConverter {

    default String pre(Node node) throws RuleLibraryException {
        return null;
    }

    String toCode(Node node) throws RuleLibraryException;
}
