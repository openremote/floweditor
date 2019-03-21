package logic.groovy;

import models.Node;

import java.lang.reflect.InvocationTargetException;

public class Groovify {


    private static Class getComparerClass(Class nodeClass) {
        try {
            String packageName = Groovify.class.getPackage().getName() + ".converters.";
            String fullname = packageName + "Groovy" + nodeClass.getSimpleName();
            return Class.forName(fullname);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String pre(Node node) {

        try {
            Class comparerClass = getComparerClass(node.getClass());
            GroovyConverter converter = constructConverter(comparerClass);
            return converter.pre(node);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String toGroovy(Node node) {

        Class comparerClass = getComparerClass(node.getClass());
        GroovyConverter converter = constructConverter(comparerClass);
        return converter.toGroovy(node);
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
