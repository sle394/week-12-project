class House { //structure for our house
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }

    //adding new rooms to array
    addRoom(name, area){
        this.rooms.push(new Room(name, area));
    }
}

class Room {
    constructor(name, area) {
        this.name = name;
        this.area = area;
    }
}

//how we're going to send the HTTP request
class HouseService {
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

    //diff methods to send the request
    static getAllHouses() { //doesn't take parameters because it will take all houses
        return $.get(this.url);
    }

    static deleteHouse(id){
        HouseService.deleteHouse(id)
            .then(() => {
                return HouseService.getAllHouses();
            })
            .then((houses) => this.render(houses));
    }

    //method to get a specific house
    static getHouse(id){ //takes id to get a specific house in the API
        return $.get(this.url + `/${id}`)
    }

    //create house using post
    static createHouse(house) {
        return $.post(this.url, house);
    }

    //updating house
    static updateHouse(house) { //updating the house, grabbing id of which house to update in the database
        return $.ajax({
            url: this.url + `/${house._id}`,
            dataType: 'json',
            data: JSON.stringify(house), //takes object and convert into a JSON string for sending it through the HTTP request
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    //deleting house
    static deleteHouse(id) { //only need ID to tell the API which house to delete
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

//dom manager class
class DOMManager {
    static houses; //houses to represent all the variables in this class

    static getAllHouses() { //doing top down methods
        HouseService.getAllHouses().then(houses => this.render(houses));
    }

    static render(houses) {
        this.houses = houses;
        $('#app').empty();
        for (let house of houses) {
            $('#app').prepend(
                `<div id="${house._id}" class="card">
                    <div class="card-header">
                        <h2>${house.name}</h2>
                        <button class="btn btn-danger" onclick="DOMManager.delete('${house.id}')">Delete</div>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${house._id}-room-name" class="form-control" placeholder="Room Name">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${house._id}-room-area" class="form-control" placeholder="Room Area">
                                </div>
                            </div>
                            <button id="${house._id}-new-room" onclick="DOMManager.addRoom('${house._id}')" class="btn btn-primary form-control">Add</button>
                        </div>
                    </div>
                </div><br>`
            );

            for (let room of house.rooms){
                $(`#${house._id}`).find('.card-body').append(
                    `<p>
                        <span id="name-${room._id}"><strong>Name: </strong> ${room.name}</span>
                        <span id="area-${room._id}"><strong>Area: </strong> ${room.area}</span>
                        <button class="btn btn-danger" onclick="DOMManager.deleteRoom('${house._id}', '${room._id}')">Delete Room</button>
                    </p>`
                );
            }
        }
    }
}

DOMManager.getAllHouses();