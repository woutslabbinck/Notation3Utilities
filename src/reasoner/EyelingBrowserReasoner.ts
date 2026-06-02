import {  Quad, Writer } from "n3";
import { Reasoner } from "./Reasoner";
import eyelingBrowser from 'eyeling/browser';

export class EyelingReasoner extends Reasoner {
    constructor() {
        super();
    }

    public async run(data: string, rules: string): Promise<string> {

        const result = eyelingBrowser.reasonRdfJs(data + rules, {
            proof: false,
            includeInputFactsInClosure: false,
            skipUnsupportedRdfJs: true
        });

        const quads: Quad[] = [];
        for await (const quad of result) {
            quads.push(quad as any); // RdfJsQuad is not the same as N3.Quad
        }
        const n3Writer = new Writer({ format: 'Turtle' });
        const output = n3Writer.quadsToString(quads);

        return output
    }
}
