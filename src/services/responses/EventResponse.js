
export default class EventResponse {
    constructor(response) {
        self._response = response
    }

    _parseAgendaEvents(agendaEvent, index) {
        return {
            id: 'agendaEvent' + index,
            name: agendaEvent.description,
            time: agendaEvent.time
        }
    }

    _parseEvent(event) {
        return {
            id: event.id,
            name: event.name,
            address : event.address,
            hour : event.time + "hs",
            date : event.date,
            tags:  event.tags,
            imagesUri : event.pictures,
            agenda: event.agenda.map((e, i) => {
                this._parseAgendaEvents(e, i)
            })
        }
    }

    event() {
        return {
            address : "Monumental",
            name: "Paramore",
            hour : "20:00hs",
            date : "24/12/2022",
            labels : ['Musica', 'Diversion'],
            agendaEntries: [{id:1, name: 'Cenar', time: '12:00'}, {id:2, name: 'Concierto', time: '13:00'}],
            imagesUri : ['https://www.dfentertainment.com/wp-content/uploads/2022/06/LOLLA_1920x720-DF-1536x576.png',
            'https://resizer.glanacion.com/resizer/bHxdQrLXjonaGNlzDA3rUJzdFcc=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/45MJFALP6FCS3LDG2YHOOOW6WQ.jpg']
          }
        return this._parseEvent(this._response);
    }
}