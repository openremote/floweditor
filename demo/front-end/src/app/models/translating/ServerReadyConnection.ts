import { ConnectionSide } from './ConnectionSide';
import { Connection } from '../Connection';
export class ServerReadyConnection {
    public from: ConnectionSide;
    public to: ConnectionSide;

    constructor(connection: Connection) {
        this.from = new ConnectionSide(
            connection.from.node.id,
            connection.from.name);
        this.to = new ConnectionSide(
            connection.to.node.id,
            connection.to.name);
    }
}
