package models;

public enum PropertyType
{
    Number("Number"),
    String("String"),
    Boolean("Boolean"),
    Trigger("Trigger"),
    Color("Color"),
    Any("Any");

    private String name;
    PropertyType(String name){
        this.name = name;
    }
}
