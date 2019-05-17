package logic;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import java.io.IOException;
import java.net.URL;

public class FileReader{

    public static String readResource(String filePath) {
        URL url = Resources.getResource(filePath);
        try {
            String text = Resources.toString(url, Charsets.UTF_8);
            return text;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  null;
    }


}
