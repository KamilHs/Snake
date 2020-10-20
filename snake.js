class Snake {
    constructor(x, y) {
        this.length = 1;
        this.array = [{ x: x, y: y }];
    }

    checkCollision() {
        const head = this.array[this.length - 1];

        for (let i = 0; i < this.length - 2; i++) {
            let distance = Math.sqrt(Math.pow(this.array[i].x - head.x, 2) + Math.pow(this.array[i].y - head.y, 2));
            if (distance < 1) {
                return true;
            }
        }

        return false;
    }

    update(x, y) {
        this.array.shift();
        this.array[this.length - 1] = ({ x: x, y: y });
    }

    grow(x, y) {
        this.array.push({ x: x, y: y });
        this.length++;
    }

    eat(x, y) {
        return Math.sqrt(Math.pow(this.array[this.length - 1].x - x, 2) + Math.pow(this.array[this.length - 1].y - y, 2)) < 5;
    }

}