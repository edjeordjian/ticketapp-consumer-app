
export default class ReportMotivesResponse {
    constructor(response) {
        this._response = response;
    }

    _parseMotive(tag) {
        return {
            id: tag.id,
            name: tag.name,
        }
    }

    motives() {
        return [
            {id:1, name: "El evento parece ilegal o no cumple con nuestras políticas."},
            {id:2, name: "Es publicidad / Spam, no es un evento real."},
            {id:3, name: "Tiene contenido ofensivo, obsceno o discriminatorio."}
        ]
        return this._response.report_motives.map((tag, i) => {
            return this._parseMotive(tag);
        })
    }
}