const SPEED_STEP = 20;
const STOPING_INTERVAL = 1500;
const DRIVING_INTERVAL = 2000;
const FRAZE_AFTER_STOPPED = 'is stopped. Maximum speed during the drive was';
const VEHICLE_MAX_SPEED = 70;
const CAR_MAX_SPEED = 80;
const MOTORCYCLE_MAX_SPEED = 90;
const MOTORCYCLE_OVERHEATING = 30;

const Vehicle = function(initialColor, initialEngine) {
  this.color = initialColor;
  this.engine = initialEngine;
  this.model = 'unknown model';
  this.maxSpeed = VEHICLE_MAX_SPEED;
  this.currentSpeed = 0;
  this.maxArrivalSpeed = 0;
  this.driveIntervalId = 0;
  this.stopingIntervalId = 0;
}

Vehicle.prototype.getInfo = function() {
  return {'color' : this.color, 'engine' : this.engine, 'maxSpeed' : this.maxSpeed, 'model' : this.model};
}
Vehicle.prototype.upgradeEngine = function(newEngine, newMaxSpeed) {
  if(this.currentSpeed === 0) {
    this.engine = newEngine;
    this.maxSpeed = newMaxSpeed;
  } else {
    console.log(`You can upgrade engine only if vehicle is stopped.`);
  }
}
Vehicle.prototype.drive = function() {
  clearInterval(this.stopingIntervalId);
  if (!this.driveIntervalId) {
    if (this instanceof Motorcycle) {
      console.log('Let\'s drive');
    }
    this.driveIntervalId = setInterval(() => {
      this.currentSpeed += SPEED_STEP;
      this.maxArrivalSpeed = this.currentSpeed;
      console.log(this.currentSpeed);
      if(this.currentSpeed >= this.maxSpeed) {
        console.log('speed is too high, SLOW DOWN!');
        if (this instanceof Motorcycle && this.currentSpeed >= this.maxSpeed + MOTORCYCLE_OVERHEATING) {
          console.log('Engine overheating');
          this.stop();
        }
      }
    }, DRIVING_INTERVAL);
  } else {
    console.log('Already driving');
  }
}
Vehicle.prototype.stop = function() {
  if (!this.stopingIntervalId) {
    clearInterval(this.driveIntervalId);
    this.driveIntervalId = 0;
    this.stopingIntervalId = window.setInterval(() => {
      this.currentSpeed - SPEED_STEP > 0 ? this.currentSpeed -= SPEED_STEP : this.currentSpeed = 0;
      console.log(this.currentSpeed);
      if (this.currentSpeed === 0) {
        if (this instanceof Motorcycle) {
          console.log(`Motorcycle ${this.model} is stopped. Good drive`);
        } else {
          this instanceof Car ? console.log(`Car ${this.model} ${FRAZE_AFTER_STOPPED} ${this.maxArrivalSpeed}`)
            : console.log(`Vehicle ${FRAZE_AFTER_STOPPED} ${this.maxArrivalSpeed}`)
        }
        this.maxArrivalSpeed = 0;
        clearInterval(this.stopingIntervalId);
        this.stopingIntervalId = 0;
      }
    }, STOPING_INTERVAL);
  } else {
    console.log('Already slows down');
  }
}

function Car( initialModel, initialColor, initialEngine) {
  Vehicle.call(this, initialColor, initialEngine);
  this.color = initialColor;
  this.engine = initialEngine;
  this.model = initialModel;
  this.maxSpeed = CAR_MAX_SPEED;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.changeColor = function(newColor) {
  newColor !== this.color ? this.color = newColor :
    console.log('The selected color is the same as the previous, please choose another one');
}

function Motorcycle( initialModel, initialColor, initialEngine) {
  Vehicle.call(this, initialColor, initialEngine);
  this.color = initialColor;
  this.engine = initialEngine;
  this.model = initialModel;
  this.maxSpeed = MOTORCYCLE_MAX_SPEED;
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;
