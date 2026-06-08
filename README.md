# Notation 3 Utilities
[![npm](https://img.shields.io/npm/v/n3-utility)](https://www.npmjs.com/package/n3-utility)

[Notation3 (N3)](https://w3c-cg.github.io/N3/spec/) is a language for natively building and reasoning over semantic Knowledge Graphs.
Several online tools exist to experiment with N3, such as the [Notation3 Editor](https://editor.notation3.org/), the [Eyeling Playground](https://eyereasoner.github.io/eyeling/playground) and the [eye-js playground](https://eyereasoner.github.io/eye-js/example/).

When building applications with N3, developers often rely on a specific reasoning library. 
Over time, they may want or need to switch to another implementation (e.g. for features, performance, or deployment constraints). However, these libraries usually expose different interfaces, making such transitions non-trivial.
This mismatch also surfaces across environments: server-side and browser-based reasoners typically have different interfaces, further complicating reuse.

This package addresses the interface mismatch by providing a uniform function interface `reason`, the core method provided by the [Reasoner](./src/reasoner/Reasoner.ts) class:

```ttl
reason(dataStore: Store, rules: string): Promise<Store>
```
This method takes an RDF graph ([Store](https://github.com/rdfjs/N3.js/)) and a set of N3 rules (.n3 string), and returns a new [Store](https://github.com/rdfjs/N3.js/) containing the inferred results.


This package supports three different implementations of N3:
- [Euler Yet another proof Engine - EYE](https://github.com/eyereasoner/eye) (The OG prolog version) through the `EyeReasoner` class
  - you do need a prolog install local -> so only works in node if eye is installed correctly
- [EYE JS](https://github.com/eyereasoner/eye-js) (webassembly version of EYE) `EyeJsReasoner` class
- [eyeling](https://github.com/eyereasoner/eyeling) (A Notation3 (N3) reasoner in JavaScript) `EyelingReasoner` class
  - Also supports streaming interfaces natively, but check the documentation or ask the maintainers for that purpose

This package supports multiple N3 reasoner implementations, each with their own class implementation that exposes the `reason` interface:

- **[EYE (Euler Yet another proof Engine)](https://github.com/eyereasoner/eye)** exposed via the `EyeReasoner` class  
  EYE is the original Notation3 implementation writtein in Prolog. Thus a local Prolog installation is required and as such only works in Node.js environments where EYE is correctly installed.
- **[EYE JS](https://github.com/eyereasoner/eye-js)** exposed via the `EyeJsReasoner` class  
  EYE JS is the WebAssembly-based version of EYE that can run in both Node.js and the browser.
- **[eyeling](https://github.com/eyereasoner/eyeling)** exposed via the `EyelingReasoner` class  
  Eyeling is a JavaScript-native N3 reasoner. It also supports streaming interfaces, though these are not exposed through this abstraction (see its documentation for advanced usage).


## How to use this library

For Typescript, independent of whether you use it in a browser or Node environment, the code below should produce the following output: `:Socrates a :Mortal .`



```ts
import { Parser, Store } from 'n3'
import { EyelingReasoner } from 'n3-utility'

const data = `
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix : <http://example.org/socrates#>.

:Socrates a :Human.
:Human rdfs:subClassOf :Mortal.
`;

const rules = `
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix : <http://example.org/socrates#>.
{
    ?S a ?A .
    ?A rdfs:subClassOf ?B . 
} 
=> 
{
    ?S a ?B .
} .
`

const store = new Store(new Parser().parse(data));

const reasoner = new EyelingReasoner();

const result = await reasoner.reason(store, rules);
```

### Local development
```sh
nvm use # If you use nvm for node version management
# Required because of mismatch between eyereasoner and the new n3 library
npm install -D --legacy-peer-deps
```

### Testing
```sh
npx playwright install
npm run test:browser 
```


## Feedback and questions

Do not hesitate to [report a bug](https://github.com/woutslabbinck/Notation3Utilities/issues).

Further questions can also be asked to [Wout Slabbinck](mailto:wout.slabbinck@ugent.be) (developer and maintainer of this repository).
