interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldCivic: Vehicle = {
  name: 'civic',
  year: new Date('September 20, 1999'),
  broken: true,
  summary(): string {
    return 'This is an old ' + this.name;
  },
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log('name: ', vehicle.name);
  console.log('year: ', vehicle.year);
  console.log('broken: ', vehicle.broken);
  console.log(vehicle.summary());
};

printVehicle(oldCivic);
