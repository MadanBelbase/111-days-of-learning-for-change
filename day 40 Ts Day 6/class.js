var point = /** @class */ (function () {
    function point(x, y) {
        this.x = x;
        this.y = y;
    }
    point.prototype.distance = function (other) {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    };
    return point;
}());
var p1 = new point(3, 5);
var p2 = new point(1, 2);
console.log(p1.distance(p2)); // Output: 5
