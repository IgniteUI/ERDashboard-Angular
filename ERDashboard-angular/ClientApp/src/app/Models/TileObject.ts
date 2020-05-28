export class TileObject {
    timestamp: Date;
    result: string;
    constructor(res, timest, formatterFunc, pattern)
    {
        this.result = res;
        this.timestamp = formatterFunc(new Date(timest), "date", pattern);
    }
}