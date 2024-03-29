
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
        return this._response.report_categories.map((tag, i) => {
            return this._parseMotive(tag);
        })
    }
}