import "mocha";
import { expect } from "chai";
import { Utilities } from "../utils";

describe("utils", () => {
    it("can get the center of a rectangle", () => {
        expect(Utilities.getCenter({
            height: 100,
            width: 100,
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
        })).to.deep.equal({
            x: 50,
            y: 50
        });
        expect(Utilities.getCenter({
            height: 1,
            width: 5,
            top: 0,
            bottom: 1,
            left: -2.5,
            right: 2.5,
        })).to.deep.equal({
            x: 0,
            y: .5
        });
    });

    it("can check if a point is inside a rectangle", () => {
        expect(Utilities.isPointInsideBox(5, 5, {
            x: 0, y: 0, width: 10, height: 10
        })).to.be.true;
        expect(Utilities.isPointInsideBox(0.5, 0.5, {
            x: 0, y: 0, width: 1, height: 1
        })).to.be.true;

        expect(Utilities.isPointInsideBox(-5, -5, {
            x: 0, y: 0, width: 10, height: 10
        })).to.be.false;
        expect(Utilities.isPointInsideBox(-5, 5, {
            x: 0, y: 0, width: 10, height: 10
        })).to.be.false;
    });

    it("can check if a rectangle is inside another rectangle", () => {
        expect(Utilities.isBoxInsideBox(
            { x: 3, y: 3, width: 4, height: 4 },
            { x: 0, y: 0, width: 10, height: 10 })).to.be.true;
        expect(Utilities.isBoxInsideBox(
            { x: -49, y: -26, width: 4, height: 23 },
            { x: -50, y: -50, width: 10, height: 50 })).to.be.true;

        expect(Utilities.isBoxInsideBox(
            { x: 0, y: 0, width: 10, height: 10 },
            { x: 3, y: 3, width: 4, height: 4 })).to.be.false;
        expect(Utilities.isBoxInsideBox(
            { x: 3, y: 3, width: 44, height: 4 },
            { x: 0, y: 0, width: 10, height: 10 })).to.be.false;
    });

    it("can humanise strings", () => {
        expect(Utilities.humanLike("ThisShouldBeHumanised")).to.equal("This should be humanised");
        expect(Utilities.humanLike("get_rid_of_underscores")).to.equal("Get rid of underscores");
        expect(Utilities.humanLike("Get___Rid_OfBoth")).to.equal("Get rid of both");
    });

    it("can shorten a string and add ellipses", () => {
        expect(Utilities.ellipsis("very long string", 4)).to.equal("v...");
        expect(Utilities.ellipsis("too long", 40)).to.equal("too long");
        expect(Utilities.ellipsis("another long string", 9, "~~")).to.equal("another~~");
    });
});
