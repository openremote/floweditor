package models.exceptions;

public class RuleLibraryException extends Exception {

    private Object origin;



    public RuleLibraryException(String message, Object origin) {
        super(message);
        this.origin = origin;
    }

    public Object getOrigin() {
        return origin;
    }
}


