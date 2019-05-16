package logic.groovy;

import models.Node;
import models.Property;
import models.exceptions.RuleLibraryException;

public interface NodeConverter {

    default String pre(Node node) throws RuleLibraryException {
        return null;
    }

    String toCode(Property property) throws RuleLibraryException;
}
