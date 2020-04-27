// FEATURE 13 - Provide default values
let STORAGE_KEY = 'CycleLogEdan';

// FEATURE 1 - Create a whole, that acts as a Facade for parts
class CycleLog { // eslint-disable-line no-unused-vars
    constructor() {
        this.allMyRides = [];
        // Attributes used for editing a ride
        this.editedItem = null;
        this.editedTaskIndex = null;
        this.beforeEditTitleCache = "";
    }

    // FEATURE 2 - Add a part
    addRide (newTitle, newStartLocation, newEndLocation, newStartTime, newEndTime) {
        newTitle = newTitle.trim();
        if (!newTitle) {
            return;
        }
        // FEATURE 13 - Provide default values 
        let newId = this.allMyRides.length + 1;
        let newStartLocation = gpsStartLoc;
        let newEndLocation = gpsEndLoc;
        let newStartTime = new Date();
        let newEndTime = new Date();
        let newDistance = calculateDistance(newStartLocation, newEndLocation);
        let newDuration = calculateDuration(newStartTime, newEndTime);
        let aNewRide = new Ride(newTitle, newId, newStartLocation, newEndLocation, newStartTime, newEndTime, newDistance, newDuration);
        this.allMyRides.push(aNewRide);
    }

    // FEATURE 3 - Sort parts
    sortRides () {
        this.allMyRides.sort((a, b) => {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        })
    }

    // FEATURE 4 - Filter parts
    // WEAK FEATURE 12 - Calculation between many parts
    getActiveRides() {
        return this.allMyRides.filter(ride => !ride.completed);
    }

    // FEATURE 4 - Filter parts
    // WEAK FEATURE 12 - Calculation between many parts
    getCompletedRides() {
        return this.allMyRides.filter(ride => ride.completed);
    }

    // FEATURE 5 - Delete a selected part
    removeRide(targetRideTitle) {
        let index = this.allMyRides.findIndex(ride => ride.title === targetRideTitle);
        this.allMyRides.splice(index, 1);
    }

    // FEATURE 5 - Delete a selected part
    removeCompleted() {
        this.allMyRides = this.getActiveRides();
    }

    // FEATURE 6 - Save all parts to LocalStorage
    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyRides)); //CHANGE SETITEM
    }

    // FEATURE 7 - Load all parts from LocalStorage
    load() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); //CHANGE GETITEM
    }

    // FEATURE 8 - Update / Edit a part
    startEdit(ride) {
        this.beforeEditCache = ride.title;
        this.editedRide = ride;
    }

    // FEATURE 8 - Update / Edit a part
    doneEdit(ride) {
        // FEATURE 10 - Validate inputs
        if (!ride) {
            return;
        }
        this.editedRide = null;
        ride.title = ride.title.trim();
        if (!ride.title) {
            this.removeRide(ride);
        }
    }

    // FEATURE 9 - Discard / revert edits to a part
    cancelEdit(ride) {
        this.editedRide = null;
        ride.title = this.beforeEditCache;
    }

    // FEATURE 12 - A calculation across many parts
    remaining() {
        return this.getActiveRides().length;
    }

    // FEATURE 12 - A calculation across many parts
    getAllDone() {
        return this.remaining() === 0;
    }
    
    // FEATURE 14 - Find a part given a search criterion
    // NOTE: Finds only FIRST match currently - CHANGE
    findPart(targetRideTitle) {
        return this.allMyRides.find((task) => task.title === targetRideTitle);
    }

    // FEATURE 15 - Get all parts
    getAllRides() {
        return this.allMyRides;
    }
}

// FEATURE 2 - Add a part
class Ride { // eslint-disable-line no-unused-vars
    constructor (newTitle, newId, newStartLocation, newEndLocation, newStartTime, newEndTime, newDistance, newDuration) {
        this.title = newTitle;
        this.id = newId;
        this.startlocation = newStartLocation;
        this.endlocation = newEndLocation;
        this.startTime = newStartTime;
        this.endTime = newEndTime;
        this.distance = newDistance;
        this.duration = newDuration;
        this.completed = false; // FEATURE 13 - Provide default values 
    }

    // FEATURE 11 - A caclulation within a part
    calculateDistance(newStartLocation, newEndLocation) {
        return                      // Needs calculation from GPS input - future iteration
    }

    // FEATURE 11 - A caclulation within a part
    calculateDuration(newStartTime, newEndTime) {
        return                      // Needs calculation from startTime / endTime
    }

}

