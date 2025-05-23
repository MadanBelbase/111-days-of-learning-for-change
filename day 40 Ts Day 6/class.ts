// class Point {
//     x: number;
//     y: number;

//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }

//     distance(other: Point): number {
//         return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
//     }
// }

// const P1 = new Point(3, 5);
// const P2 = new Point(1, 2);
// console.log(p1.distance(p2)); // Output: 5

class Nepal {
    name : string;
}
class city extends Nepal {
    cityName: string;
    constructor(name: string, cityName: string) {
        super();
        this.name = name;
        this.cityName = cityName;
    }
}
