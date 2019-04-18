package logic.groovy;

import models.Node;
import models.exceptions.RuleLibraryException;

import java.lang.reflect.InvocationTargetException;

public class Groovify {


    private static Class getComparerClass(Node node) {
        try {
            String packageName = Groovify.class.getPackage().getName() + ".converters.";
            String fullname = packageName + "Groovy" + node.getNodeName() +"Node";
            return Class.forName(fullname);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String pre(Node node) throws RuleLibraryException {


            Class comparerClass = getComparerClass(node);
            GroovyConverter converter = constructConverter(comparerClass);
            String s = converter.pre(node);
            if(s == null){
                return "";
            }
            return  s;

    }

    public static String toGroovy(Node node) throws RuleLibraryException {

        Class comparerClass = getComparerClass(node);
        GroovyConverter converter = constructConverter(comparerClass);
        return converter.toCode(node);
    }

    private static GroovyConverter constructConverter(Class comparerClass) {
        try {
            return (GroovyConverter) comparerClass.getConstructors()[0].newInstance();
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e1) {
            e1.printStackTrace();
        }
        return null;
    }
}
