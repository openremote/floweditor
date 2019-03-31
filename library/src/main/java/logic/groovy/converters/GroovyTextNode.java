package logic.groovy.converters;

import logic.groovy.GroovyConverter;
import models.Node;

public class GroovyTextNode implements GroovyConverter {

    @Override
    public String toCode(Node node) {
        return "\"" + node.getInternalVariable("text").getValue().toString() + "\"" ;
    }
}
