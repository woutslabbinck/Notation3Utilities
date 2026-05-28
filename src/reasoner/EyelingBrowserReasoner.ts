import { Reasoner } from "./Reasoner";
// import { reason } from "eyeling" //TODO:

export class EyelingReasoner extends Reasoner {
    constructor() {
        super();
    }

    public async run(data: string, rules: string): Promise<string> {
        // TODO: don't use reason here
        return Promise.resolve("<a> <b> <c> .")
    }
}
