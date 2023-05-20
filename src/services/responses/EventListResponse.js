
export default class EventListResponse {
    constructor(response) {
        this._response = response;
    }

    _parseEvent(event) {
        return {
            id: event.id,
            isFavorite: event.is_favorite,
            name: event.name,
            address : event.address,
            hour : event.time + "hs",
            date : event.date,
            distance: event.distance,
            imageUri : event.pictures[0]
        }
    }

    events() {
        return this._response.events.map((e, i) => {
            return this._parseEvent(e);
        })
    }
}