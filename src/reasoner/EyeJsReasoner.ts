import { n3reasoner } from "eyereasoner";
import { Reasoner } from "./Reasoner";

export class EyeJsReasoner extends Reasoner {
    constructor() {
        super();
    }

    public async run(data: string, rules: string): Promise<string> {

        // Does the same as `npx eyereasoner --nope --quiet --pass-only-new data&query.n3`
        return await n3reasoner(data + rules, undefined, { output: "derivations" })
    }
}
