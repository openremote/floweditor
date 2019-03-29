package rest;

import com.google.gson.Gson;
import com.thetransactioncompany.json.pretty.PrettyJson;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Objects;

@Path("nodes")
public class NodeService
{
    private Gson gson = new Gson();

    @GET
    @Path("getAll")
    public Response getAll() throws Exception
    {
        ArrayList<String> readFiles = new ArrayList<>();

        File nodeDir = new File(ClassLoader.getSystemResource("nodes").getPath());

        for (File file : Objects.requireNonNull(nodeDir.listFiles()))
        {
            readFiles.add(new String(Files.readAllBytes(Paths.get(file.toURI()))));
        }

        return textToResponse("[" + String.join(",", readFiles) + "]");
    }

    @GET
    @Path("translate")
    public Response translate(@QueryParam("nodes") String jsonNodeSet) throws ParseException
    {
        //Use the library here
        PrettyJson json = new PrettyJson(PrettyJson.Style.DEFAULT);
        return objectToResponse(json.parseAndFormat(jsonNodeSet));
    }

    private Response objectToResponse(Object obj)
    {
        return Response.status(200).entity(gson.toJson(obj)).header("Access-Control-Allow-Origin", "*").build();
    }

    private Response textToResponse(String str)
    {
        return Response.status(200).entity(str).header("Access-Control-Allow-Origin", "*").build();
    }
}
