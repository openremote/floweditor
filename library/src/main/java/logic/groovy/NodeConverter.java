package logic.groovy;

import models.Node;

public interface NodeConverter {

    default String pre(Node node) {
        return null;
    }

    String toCode(Node node);
}
