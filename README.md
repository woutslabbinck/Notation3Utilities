# Notation 3 Utilities

TODO: What is Notation 3 in one sentence

TODO: WHY? Pragmatic way of experimenting with N3. If you want anything fancy, checkout the handbook of Jos


## How to use this library

In Node vs in the browser
NOTE: should both work

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

### Reasoner Interface

Different instances: TODO:
- eye (The OG prolog version)
- eyeReasoner (webassembly version)
- eyeling (the newest one from Jos)


## Feedback and questions

Do not hesitate to [report a bug](https://github.com/woutslabbinck/Notation3Utilities/issues).

Further questions can also be asked to [Wout Slabbinck](mailto:wout.slabbinck@ugent.be) (developer and maintainer of this repository).
