package translation;

import logic.StandardNodeTypeCollection;
import logic.groovy.GroovyRuleGenerator;
import logic.nodeSetReader.NodeSetReader;
import logic.nodeTypeReader.NodeTypeCollection;
import models.NodeSet;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public final class Translator
{
    public static NodeTypeCollection getNodeTypeCollection() {
        return nodeTypeCollection;
    }

    private static NodeTypeCollection nodeTypeCollection = new StandardNodeTypeCollection();
    public static String translate(String input) throws Exception
    {


        NodeSetReader setReader = new NodeSetReader(nodeTypeCollection);
        NodeSet nodes = setReader.read(input);

        GroovyRuleGenerator generator = new GroovyRuleGenerator(nodes);

        String result = generator.generate();

        return result;
    }

    private static String readFile(String filePath)
    {
        StringBuilder contentBuilder = new StringBuilder();


        File home = null;
        try
        {
            home = new File(ClassLoader.getSystemResource("nodes").toURI());
        } catch (URISyntaxException e)
        {
            e.printStackTrace();
        }
        Path path = null;
        try
        {
            path = Paths.get(home.getCanonicalPath() + "/" + filePath);
        } catch (IOException e)
        {
            e.printStackTrace();
        }

        try (Stream<String> stream = Files.lines(path, StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e)
        {
            e.printStackTrace();
        }

        String result = contentBuilder.toString();
        ;

        return result;
    }

}
