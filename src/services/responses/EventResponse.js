
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
        console.log(event);
        return {
            id: event.id,
            name: event.name,
            address: event.address,
            description: event.description,
            hour: event.time + "hs",
            date: event.date,
            labels:  event.types_names,
            imagesUri: event.pictures,
            organizerName: event.organizerName,
            agendaEntries: event.agenda.map((e, i) => {
                return this._parseAgendaEvents(e, i)
            })
        }
    }

    event() {
        return this._parseEvent();
    }
}