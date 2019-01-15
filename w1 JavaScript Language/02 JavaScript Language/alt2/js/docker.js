class Stuff {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
    }
}

class Bag {
    constructor(maxWeight) {
        this.maxWeight = maxWeight;
        this.itemArray = [];
        this.totalWeight = 0;
    }

    add(item) {
        if (!item instanceof Stuff) throw new Error("Wrong kind of objetct, not allowed!");
        else if (this.itemArray.includes(item)) throw new Error("Stuff already added, not allowed!");
        else if ((this.totalWeight + item.weight) > this.maxWeight) throw new Error("Too heavy, not allowed!");
        else {
            this.itemArray.push(item);
            this.totalWeight += item.weight;
        }
    }

    weight() {
        return this.totalWeight;
    }
}

class Cargo {
    constructor(maxWeight) {
        this.maxWeight = maxWeight;
        this.itemArray = [];
        this.totalWeight = 0;
    }

    add(item) {
        if (!item instanceof Bag) throw new Error("Wrong kind of objetct, not allowed!");
        else if (this.itemArray.includes(item)) throw new Error("Stuff already added, not allowed!");
        else if ((this.totalWeight + item.weight) > this.maxWeight) throw new Error("Too heavy, not allowed!");
        else {
            this.itemArray.push(item);
            this.totalWeight += item.weight;
        }
    }

    weight() {
        return this.totalWeight;
    }
}

describe("A spec using beforeAll", function () {
    let stone, bag, book, cotton, vuitton, schenker;
    beforeAll(function () {
        bag = new Bag(10);
        stone = new Stuff("stone", 3);
        book = new Stuff("book", 7);
        cotton = new Stuff("cotton", 0.001);
        vuitton = new Bag(3);
        schenker = new Cargo(15);
    });
    it('Bag\'s weight should be 3: ', function () {
        bag.add(stone);
        expect(bag.weight()).toBe(3);
    });
    it('Bag\'s weight should be 3: ', function() {
        expect(() => { bag.add(stone); }).toThrowError("Stuff already added, not allowed!");
    });
    it('Bag\'s weight should be 10: ', function() {
        bag.add(book);
        expect(bag.weight()).toBe(10);
    });
    it('Should throw error because max weight is exceeded: ', function() {
        expect(() => { bag.add(cotton); }).toThrowError("Too heavy, not allowed!");
    });
    it('Cargo\'s weight should be 10: ', function() {
        schenker.add(bag);
        expect(schenker.weight()).toBe(10);
    });
    it('Should throw error because wrong kind of item: ', function() {
        expect(() => { schenker.add(cotton); }).toThrowError("Wrong kind of objetct, not allowed!");
    });
    it('Cargo\'s weight should be 10.001: ', function() {
        vuitton.add(cotton);
        schenker.add(vuitton);
        expect(schenker.weight()).toBe(10.001);
    });
    it('Cargo\'s weight should be 310: ', function() {
        cotton.weight = 300;
        expect(schenker.weight()).toBe(10.001);
    });
});