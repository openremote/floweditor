package logic.apiConnection;

import com.google.gson.Gson;
import logic.FileReader;
import logic.nodeTypeReader.Internal;
import logic.nodeTypeReader.NodeJSONSpecs;
import logic.nodeTypeReader.NodeSpecProperty;
import logic.nodeTypeReader.Picker;
import models.PropertyType;

import java.util.ArrayList;
import java.util.List;

public class AttributeAssetGenerator {

    private static boolean useCached = true;
    private String serverPath = "https://192.168.99.100";

    public String generate() {

        if(useCached) {
           return generateCached();
        }
        return generateLive();
    }

    private String generateCached(){
       return FileReader.readResource("AttributeNodeCached.json");
    }

    private String generateLive() {
        try {
            Asset[] assets;

            String url = serverPath + "/api/v1/model/asset/descriptors";
            String result = UnsafeHttpRequester.request(url);

            Gson gson = new Gson();
            assets = gson.fromJson(result, Asset[].class);

            List<DoubleDropdownOptions> options = new ArrayList<>();

            for (Asset asset : assets) {

                DoubleDropdownOptions option = new DoubleDropdownOptions();
                option.name = asset.name;
                List<DoubleDownOptionEntry> entries = new ArrayList<>();
                if (asset.attributeDescriptors == null) {
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
            jsonSpecs.outputs[0] = new NodeSpecProperty();
            jsonSpecs.outputs[0].name = "value";
            jsonSpecs.outputs[0].type = PropertyType.Any;
            jsonSpecs.internals = new Internal[1];
            jsonSpecs.internals[0] = new Internal();
            jsonSpecs.internals[0].name = "Attribute";
            Picker picker = new Picker();
            picker.type = "DoubleDropdown";
            picker.options = options.toArray(new DoubleDropdownOptions[0]);
            jsonSpecs.internals[0].picker = picker;
            return  gson.toJson(jsonSpecs);

        } catch (Exception e) {
            e.printStackTrace();
        }

        throw new IllegalArgumentException();
    }

}


