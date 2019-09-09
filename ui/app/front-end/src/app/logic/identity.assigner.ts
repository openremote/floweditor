export class IdentityAssigner {
    private static index = 0;

    public static generateIdentity() {
        IdentityAssigner.index++;
        return IdentityAssigner.index;
    }
}
