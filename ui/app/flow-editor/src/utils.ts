export class Utilities {
    public static getCenter(bounds: ClientRect) {
        return {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2
        };
    }

    public static isPointInsideBox(x: number, y: number, box: { x: number, y: number, width: number, height: number }) {
        return (x > box.x) && (x < box.x + box.width) && (y > box.y) && (y < box.y + box.height);
    }

    public static isBoxInsideBox(a: { x: number, y: number, width: number, height: number }, b: { x: number, y: number, width: number, height: number }) {
        const deltaX = b.x - a.x;
        const deltaY = b.y - a.y;

        return a.x >= b.x && (a.width - deltaX <= b.width) &&
            a.y >= b.y && (a.height - deltaY <= b.height);
    }

    public static humanLike(input: string) {
        return (input[0].toUpperCase() + input.toLowerCase().substr(1)).replace("_", " ");
    }

    public static ellipsis(input: String, maxLength = 15, ellipsis = "...") {
        if (ellipsis.length > maxLength) {
            console.warn("Invalid ellipsis parameters: given ellipsis is longer than the max length");
            return input;
        }
        if (!input) {
            return "";
        }
        if (input.length > 8) {
            return input.substr(0, maxLength - ellipsis.length) + ellipsis;
        }
        return input;
    }
}
