import { Reasoner } from "./Reasoner";
import { reason } from "eyeling"

export class EyelingReasoner extends Reasoner {
    constructor() {
        super();
    }

    public async run(data: string, rules: string): Promise<string> {

        return reason({ output: "derivations", proofComments: false }, data + rules)
    }
}
