package logic.nodeTypeReader;

import com.google.gson.Gson;

public class NodeTypeReader {
    public static   NodeJSONSpecs read(String json){
        Gson gson = new Gson();
        NodeJSONSpecs value = gson.fromJson(json, NodeJSONSpecs.class);
        return value;
    }
}
