class Vehicle {
  //   private color: string;

  constructor(public color: string) {
    // this.color = color;
  }

  public drive(): void {
    console.log('vroom vroom ' + this.color);
  }

  public honk(): void {
    console.log('HONKKKK');
  }
}

const vehicle = new Vehicle('RED');

class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
  }
}

const car = new Car(4, 'orange');

const beep = (v: Vehicle): void => {
  v.honk();
  v.drive();
};

beep(car);
