
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
        console.log(this.timeToString(new Date(agendaEvent.start)));
        return {
            id: 'agendaEvent' + index,
            name: agendaEvent.title,
            time: this.timeToString(new Date(agendaEvent.start)),
            end: this.timeToString(new Date(agendaEvent.end)),
        }
    }

    _parseEvent() {
        const event = this._response;
        console.log(event);
        return {
            id: event.id,
            name: event.name,
            address : event.address,
            description: event.description,
            hour : event.time + "hs",
            date : event.date,
            labels:  event.types_names,
            imagesUri : event.pictures,
            agendaEntries: event.agenda.map((e, i) => {
                return this._parseAgendaEvents(e, i)
            })
        }
    }

    event() {
        // return {
        //     address : "Monumental",
        //     name: "Paramore",
        //     hour : "20:00hs",
        //     date : "24/12/2022",
        //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        //     labels : ['Musica', 'Diversion'],
        //     agendaEntries: [{id:1, name: 'Cenar', time: '12:00'}, {id:2, name: 'Concierto', time: '13:00'}],
        //     imagesUri : ['https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png',
        //     'https://resizer.glanacion.com/resizer/bHxdQrLXjonaGNlzDA3rUJzdFcc=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/45MJFALP6FCS3LDG2YHOOOW6WQ.jpg']
        //   }
        return this._parseEvent();
    }
}