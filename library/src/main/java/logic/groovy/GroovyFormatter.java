package logic.groovy;

public class GroovyFormatter {
    public String format(String code) {
        int indend = 0;

        StringBuilder formatted = new StringBuilder();
        for (int i = 0; i < code.length(); i++) {

            char c = code.charAt(i);
            if (c == '{') {
                indend++;
                //formatted.append("\n");

            }
            if (c == '}') {
                for (int j = 0; j < 1; j++) {
                    //formatted.deleteCharAt(formatted.length()-1);
                }
                indend--;
            }
            if (c == '\n') {
                formatted.append(c);

                for (int j = 0; j < indend; j++) {
                    formatted.append("\t");
                }
                continue;
            }
            formatted.append(c);
        }

        return formatted.toString();

    }

}
