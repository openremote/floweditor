export class Utilities {
    public static getCenter(bounds: ClientRect) {
        return {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2
        };
    }
}
