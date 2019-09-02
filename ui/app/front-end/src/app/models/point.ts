export class Point {
    constructor(public x: number, public y: number) {

    }

    public static add(a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    public static subtract(a: Point, b: Point): Point {
        return new Point(a.x - b.x, a.y - b.y);
    }

    public static multiply(a: Point, b: number): Point {
        return new Point(a.x * b, a.y * b);
    }

    public static lerpNumber(x: number, y: number, t: number) {
        return x * (1 - t) + y * t;
    }

    public static lerp(a: Point, b: Point, t: number): Point {
        const x = Point.lerpNumber(a.x, b.x, t);
        const y = Point.lerpNumber(a.y, b.y, t);

        return new Point(x, y);
    }
}
