package models.exceptions;

public class RuleLibraryException extends Exception {

    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    private Object origin;


    public RuleLibraryException(String message, Object origin) {
        super(message);
        this.origin = origin;
    }

    public void printNeatly(){
        System.out.println(ANSI_CYAN +"["+getOrigin().getClass().getSimpleName()+"] "+
                ANSI_RESET + ANSI_RED +  getMessage() + ANSI_RESET);
    }

    public Object getOrigin() {
        return origin;
    }
}


