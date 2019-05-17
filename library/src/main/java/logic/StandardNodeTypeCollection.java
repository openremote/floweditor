package logic;

import logic.apiConnection.AttributeAssetGenerator;
import logic.groovy.NodeConverter;
import logic.groovy.converters.GroovyThenNode;
import logic.nodeTypeReader.NodeTypeCollection;
import org.reflections.Reflections;

import java.util.Set;


public class StandardNodeTypeCollection extends NodeTypeCollection {


    public StandardNodeTypeCollection() {

        Reflections reflections = new Reflections("logic.groovy.converters");
        Set<Class<?>> standardConverters = reflections.getTypesAnnotatedWith(StandardNode.class);

        for (Class<?> converter : standardConverters) {

            String jsonFileName ;
            String nodeName;

            nodeName = converter.getSimpleName().replaceFirst("Groovy","");
            nodeName = nodeName.replaceFirst("Node","");

            jsonFileName =nodeName + ".json";
            registerNode(FileReader.readResource(jsonFileName));
            registerNodeConverter(nodeName, (Class<? extends NodeConverter>) converter);
        }

        AttributeAssetGenerator assetModelRetriever = new AttributeAssetGenerator();
        registerNode(assetModelRetriever.generate());
        registerNodeConverter("AttributeNode", GroovyThenNode.class);
    }
}
