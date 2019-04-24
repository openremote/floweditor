import org.junit.Test;

public class NodeTests {

    @Test
    public void MultiplyTest(){
     /*   Node multiplyNode = new MultiplyNode();
        ValueNode<Integer> valuenode1 = new ValueNode<>();
        valuenode1.getOutputProperty(0).setValue(8);
        ValueNode<Integer> valuenode2 = new ValueNode<>();
        valuenode2.getOutputProperty(0).setValue(5);

        multiplyNode.setInputReference(0,valuenode1.getOutputProperty(0));
        multiplyNode.setInputReference(1,valuenode2.getOutputProperty(0));
        int value =  (int) multiplyNode.getOutputProperty(0).getValue();
        Assert.assertEquals(40780,value);



        .when{

        }.then{

        setAttribute(name, () * ()

        }



     */
    }
/*
    private String readFile(String filePath)
    {
        StringBuilder contentBuilder = new StringBuilder();

        try (Stream<String> stream = Files.lines( Paths.get(filePath), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        return contentBuilder.toString();
    }

    @Test
    public void NodeReaderTest() throws IOException {

        NodeTypeCollection nodeCollection = new NodeTypeCollection();
        nodeCollection.registerNode( readFile("comparer.json"));
        nodeCollection.registerNodeConverter("Comparer", GroovyComparatorNode.class);
    }*/
}
