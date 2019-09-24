import { NodePosition } from '@openremote/model';

export class Utils {
    public static add(a: NodePosition, b: NodePosition): NodePosition {
        return { x: a.x + b.x, y: a.y + b.y };
    }

    public static subtract(a: NodePosition, b: NodePosition): NodePosition {
        return { x: a.x - b.x, y: a.y - b.y };
    }

    public static multiply(a: NodePosition, b: number): NodePosition {
        return { x: a.x * b, y: a.y * b };
    }

    public static lerpNumber(x: number, y: number, t: number) {
        return x * (1 - t) + y * t;
    }

    public static lerp(a: NodePosition, b: NodePosition, t: number): NodePosition {
        const x = Utils.lerpNumber(a.x, b.x, t);
        const y = Utils.lerpNumber(a.y, b.y, t);

        return { x, y };
    }
}