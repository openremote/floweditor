import { GraphSocket } from 'node-structure';

export class IdentityAssigner {
    private static index = 0;

    // TODO reset index to maximum of the entire project because deserialisation

    public static generateIdentity() {
        IdentityAssigner.index++;
        return IdentityAssigner.index;
    }

    public static getSocketElementIdentity(socket: GraphSocket) {
        const isInput = socket.node.inputs.includes(socket);
        return socket.node.id.toString() + socket.name + (isInput ? 'i' : 'o');
    }
}
