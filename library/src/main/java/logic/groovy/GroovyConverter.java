package logic.groovy;

import models.Node;

public interface GroovyConverter<T extends Node>{

    default String pre(T node) {
        return null;
    }

    String toGroovy(T node);
}
