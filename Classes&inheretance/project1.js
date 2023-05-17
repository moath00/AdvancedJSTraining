class Hotel {
    #minFloor;
    #maxFloor;

    // Constructor that initializes a new instance of Hotel.
    // Receives address, number of rooms and rooms.
    constructor(Address, NumberOfRooms, rooms) {
        this.Address = Address;
        this.NumberOfRooms = NumberOfRooms;
        this.#minFloor = 1;
        this.#maxFloor = 6;
        this.rooms = rooms;
    }

    get minFloor() {
        return this.#minFloor;
    }

    set minFloor(minFloor) {
        this.#minFloor = minFloor;
    }

    get maxFloor() {
        return this.#maxFloor;
    }

    set maxFloor(maxFloor) {
        this.#maxFloor = maxFloor;
    }

    printAdvertisement() {
        console.log(
        "This hotil address is: " +
            this.Address +
            ".\nwe have " +
            this.NumberOfRooms +
            " rooms, rooms avilable now are: " +
            (this.NumberOfRooms - this.rooms.length));
            this.listBookedRooms();
            console.log(
            "minimum floors we have is: " +
            this.minFloor +
            " and maximum floors we have is: " +
            this.maxFloor + "."
        );
    }

    listBookedRooms() {
        console.log("The list of booked rooms  are:");
        for (var i = 0; i < this.rooms.length; i++) {
            if (!this.rooms[i].isBooked)
            console.log("Room number " + this.rooms[i].roomNumber + " in floor #" + this.rooms[i].floorNum +".")
        }
    }
}

class Room {

    #isBooked;

    // Constructor that initializes a new instance of Room.
    // Recives floor, number and price.
    constructor(floorNum, roomNumber, price) {
        this.floorNum = floorNum;
        this.roomNumber = roomNumber;
        this.price = price;
        this.#isBooked = false;
    }

    printRoom() {
        console.log("This is a room #" + this.roomNumber + " in floor #" + this.floorNum + ", its price is " + this.price + ".");
    }

    get isBooked() {
        return this.#isBooked;
    }

    set isBooked(status) {
        this.#isBooked = status;
    }

    book() {
        this.isBookedRoom(true);
    }

}

class RoomWithView extends Room {
  constructor(floorNum, roomNumber, price, view, numberOfBeds) {
    super(floorNum, roomNumber, price);
    this.view = view;
    this.numberOfBeds = numberOfBeds;
  }

  // override this method from Room
  printRoom() {
    console.log(
      "This is a room #" +
        this.roomNumber +
        " in floor #" +
        this.floorNum +
        ", its viewed the " +
        this.view +
        " and has a " +
        this.numberOfBeds +
        " beds, its price is " +
        this.price + "."
    );
  }
}

class SleepingRoom extends Room {
  constructor(floorNum, roomNumber, price, personCapacity) {
    super(floorNum, roomNumber, price);
    this.personCapacity = personCapacity;
  }

  // override this method from Room class
  printRoom() {
    console.log(
      "This is a sleeping room #" +
        this.roomNumber +
        " in floor #" +
        this.floorNum +
        ", the room capacity is " +
        this.personCapacity +
        ", its price is " +
        this.price
    );
  }
}

// initialize the rooms
const roomNumber1 = new SleepingRoom(2,11,50,3);
const roomNumber2 = new SleepingRoom(2,15,70,2);
const roomNumber3 = new RoomWithView(5,49,80,"peach view",2);
const roomNumber4 = new RoomWithView(1,8,150,"open to the peach view",2);

// roomNumber1.printRoom();
// roomNumber2.printRoom();
// roomNumber3.printRoom();
// roomNumber4.printRoom();

// rooms array
let rooms = [roomNumber1, roomNumber2, roomNumber3, roomNumber4];

// initialize the hotel
const BlueHotel = new Hotel("Street 444, North beach, side #2", 50, rooms);
BlueHotel.printAdvertisement();
// BlueHotel.listBookedRooms();