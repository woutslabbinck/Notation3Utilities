import { Store, Parser, Writer } from "n3";

export abstract class Reasoner {
    constructor() {
    }

    /**
     * Run the reasoner
     * @returns An N3 string containing the result of the inferences
     */
    public abstract run(data: string, rules: string): Promise<string>;

    /**
     * Reason on an N3 store of triples with zero or more N3 rules descriptions.
     * @param dataStore - An N3 Store containing data
     * @param rules - N3 rules represented as string.
     * @returns An N3 Store with the reasoning result
     */
    public async reason(dataStore: Store, rules: string): Promise<Store> {

        const n3 = new Writer().quadsToString(dataStore.getQuads(null, null, null, null));

        if (!n3) {
            throw new Error(`failed to transform store to turtle`);
        }

        const result = await this.run(n3, rules);

        const resultStore = new Store(new Parser().parse(result));
    
        return resultStore;
    }
}
