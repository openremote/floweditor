import { GraphSocket } from 'node-structure';
import * as ShortID from 'shortid';

export class IdentityAssigner {

    public static generateIdentity(): string {
        return ShortID.generate();
    }

    public static getSocketElementIdentity(socket: GraphSocket) {
        return socket.id;
    }
}
