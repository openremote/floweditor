package logic.apiConnection;

import com.google.gson.Gson;
import logic.nodeTypeReader.Internal;
import logic.nodeTypeReader.NodeJSONSpecs;
import logic.nodeTypeReader.NodeSpecProperty;
import logic.nodeTypeReader.Picker;

import java.util.ArrayList;
import java.util.List;

class Asset {
    String name;
    AttributeDescriptor[] attributeDescriptors;

}

class AttributeDescriptor {
    String attributeName;
}

class  DoubleDownOptionEntry{
    public String name;
}

class DoubleDropdownOptions {
    public String name;
    public DoubleDownOptionEntry[] options;
}

public class AssetModelRetriever {
    public String generate() {

        return "{\n" +
                "    \"name\": \"AttributeNode\",\n" +
                "    \"type\": \"Input\",\n" +
                "    \"outputs\": [\n" +
                "        {\n" +
                "            \"name\": \"value\",\n" +
                "            \"type\": \"Any\"\n" +
                "        }\n" +
                "    ],\n" +
                "    \"internals\": [\n" +
                "        {\n" +
                "            \"picker\": {\n" +
                "                \"type\": \"DoubleDropdown\",\n" +
                "                \"options\": [\n" +
                "                    {\n" +
                "                        \"name\": \"BUILDING\",\n" +
                "                        \"options\": [\n" +
                "                            {\n" +
                "                                \"name\": \"surfaceArea\"\n" +
                "                            },\n" +
                "                            {\n" +
                "                                \"name\": \"street\"\n" +
                "                            },\n" +
                "                            {\n" +
                "                                \"name\": \"city\"\n" +
                "                            },\n" +
                "                            {\n" +
                "                                \"name\": \"country\"\n" +
                "                            },\n" +
                "                            {\n" +
                "                                \"name\": \"postalCode\"\n" +
                "                            }\n" +
                "                        ]\n" +
                "                    },\n" +
                "                    {\n" +
                "                        \"name\": \"ROOM\",\n" +
                "                        \"options\": [\n" +
                "                            {\n" +
                "                                \"name\": \"temperature\"\n" +
                "                            },\n" +
                "                            {\n" +
                "                                \"name\":\"floor\"\n" +
                "                            }\n" +
                "                        ]\n" +
                "                    }\n" +
                "                ]\n" +
                "            },\n" +
                "            \"name\": \"Attribute\"\n" +
                "        }\n" +
                "    ]\n" +
                "}";
/*
        try {
            Asset[] assets;
            if (true) {
                String url = "https://192.168.99.100/api/v1/model/asset/descriptors";
                //url = URLEncoder.encode(url, "UTF-8");

                String result = UnsafeHttpRequester.request(url);
                Gson gson = new Gson();
                assets = gson.fromJson(result, Asset[].class);
            } else {
                assets = new Asset[1];
                assets[0] = new Asset();
                assets[0].name = "TestAsset";
                assets[0].attributeDescriptors = new AttributeDescriptor[1];
                assets[0].attributeDescriptors[0] = new AttributeDescriptor();
                assets[0].attributeDescriptors[0].attributeName = "Value";

            }
            List<DoubleDropdownOptions> options = new ArrayList<>();
            for (Asset asset : assets) {

                DoubleDropdownOptions option = new DoubleDropdownOptions();
                option.name = asset.name;
                List<DoubleDownOptionEntry> entries = new ArrayList<>();
                if(asset.attributeDescriptors ==null){
                    continue;
                }
                for (AttributeDescriptor descriptor : asset.attributeDescriptors) {
                    DoubleDownOptionEntry entry = new DoubleDownOptionEntry();
                    entry.name = descriptor.attributeName;
                    entries.add(entry);
                }
                option.options = entries.toArray(new DoubleDownOptionEntry[0]);
                options.add(option);
            }
            NodeJSONSpecs jsonSpecs = new NodeJSONSpecs();
            jsonSpecs.name = "AttributeNode";
            jsonSpecs.inputs = null;
            jsonSpecs.outputs = new NodeSpecProperty[1];
            jsonSpecs.outputs[0] =new NodeSpecProperty();
            jsonSpecs.outputs[0].name = "value";
            jsonSpecs.outputs[0].type = "any";
            jsonSpecs.internals = new Internal[1];
            jsonSpecs.internals[0] = new Internal();
            jsonSpecs.internals[0].name = "Attribute";
            Picker picker = new Picker();
            picker.type = "DoubleDropdown";
            picker.options = options.toArray(new DoubleDropdownOptions[0]);
            jsonSpecs.internals[0].picker = picker;

            Gson gson = new Gson();
            String s = gson.toJson(jsonSpecs);



        } catch (Exception e) {
            e.printStackTrace();
        }
*/
    }

}


