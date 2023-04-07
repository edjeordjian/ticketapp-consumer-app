
export default class EventListResponse {
    constructor(response) {
        this._response = response;
    }

    _parseEvent(event) {
        return {
            id: event.id,
            name: event.name,
            address : event.address,
            hour : event.time + "hs",
            date : event.date,
            imageUri : event.pictures[0]
        }
    }

    events() {
        // const anEvent = {
        //     id: '234',
        //     name: "Paramore",
        //     address : "Monumental",
        //     hour : "20:00hs",
        //     date : "24/12/2022",
        //     imageUri : 'https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png'
        //   }
        //   const otherEvent = {
        //     id: '24',
        //     name: "Green Day",
        //     address : "Monumental",
        //     hour : "20:00hs",
        //     date : "24/12/2022",
        //     imageUri : 'https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png'
        //   }
        // return [anEvent, otherEvent]
        return this._response.events.map((e, i) => {
            return this._parseEvent(e);
        })
    }
}