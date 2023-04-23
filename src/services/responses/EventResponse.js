
export default class EventResponse {
    constructor(response) {
        this._response = response
    }

    timeToString(aTime) {
        let hours = aTime.getHours();
        let minutes = aTime.getMinutes();
    
        if (hours < 10) {
            hours = `0${hours}`
        }
    
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
    
        return `${hours}:${minutes}`
    }

    _parseAgendaEvents(agendaEvent, index) {
        return {
            id: 'agendaEvent' + index,
            name: agendaEvent.title,
            start: this.timeToString(new Date(agendaEvent.start)),
            end: this.timeToString(new Date(agendaEvent.end)),
        }
    }

    _parseEvent() {
        const event = this._response;

        let latitude, longitude;

        if (event.latitude && event.longitude) {
            latitude = Number(event.latitude);
            longitude = Number(event.longitude);
        }


        return {
            id: event.id,
            name: event.name,
            address: event.address,
            description: event.description,
            hour: event.time + "hs",
            date: event.date,
            labels:  event.types_names,
            ticket: event.ticket ? {
                wasUsed: event.ticket.wasUsed,
                id: event.ticket.id
            } : null,
            faq: event.faq,
            imagesUri: event.pictures,
            organizerName: event.organizerName,
            agendaEntries: event.agenda.map((e, i) => {
                return this._parseAgendaEvents(e, i)
            }),
            latitude: latitude,
            longitude: longitude,
            capacity: event.capacity
        }
    }

    event() {
        return this._parseEvent();
    }
}