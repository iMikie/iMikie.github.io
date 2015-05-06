/**
 * Created by mikefarr on 5/2/15.
 */
function Shape(xpos, ypos) {
    this.x = typeof xpos == 'undefined' ? 0 : xpos;
    this.y = typeof ypos == 'undefined' ? 0 : ypos;
}

// superclass method
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle(side, x, y) {
    Shape.call(this, x, y); // call super constructor.
    this.side = typeof side == 'undefined' ? 0 : side;
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.perimeter = function() {
    return this.side * 4;
}

var rect = new Rectangle(5);

console.log('Is rect an instance of Rectangle? ' + (rect instanceof Rectangle)); // true
console.log('Is rect an instance of Shape? ' + (rect instanceof Shape)); // true
console.log('Side of Rectangle: ' + rect.side);
console.log('perimeter of Rectangle: ' + rect.perimeter());
console.log('xpos of Rectangle: ' + rect.x);
rect.move(1, 1); // Outputs, 'Shape moved.'