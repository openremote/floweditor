package models;

public class ServerResponse
{
    private boolean success;
    private Object object;

    public ServerResponse(boolean success, Object object)
    {
        this.success = success;
        this.object = object;
    }

    public boolean isSuccess()
    {
        return success;
    }

    public void setSuccess(boolean success)
    {
        this.success = success;
    }

    public Object getObject()
    {
        return object;
    }

    public void setObject(Object object)
    {
        this.object = object;
    }
}
