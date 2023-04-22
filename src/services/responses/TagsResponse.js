
export default class TagsResponse {
    constructor(response) {
        this._response = response;
    }

    _parseTag(tag) {
        return {
            id: tag.id,
            name: tag.name,
        }
    }

    tags() {
        return this._response.event_types.map((tag, i) => {
            return this._parseTag(tag);
        })
    }
}