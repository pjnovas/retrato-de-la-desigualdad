# CSV Parser
Process to curate CSV data from https://github.com/jcs/triptracker to calculate distances for **Un Retrato de la Desigualdad**.
This process will print calculations on the console, then you have to past them in the `data.json` file.

## Getting started
[NodeJS v4+](https://nodejs.org/) is Required

```bash
npm install
```

To run the example file CSV (`example.csv`) use:
```bash
node index.js
```

To run another CSV file use option `--in`:
```bash
node index.js --in path/to/file.csv
```

To run excluding user ids use option `--exclude` with ids comma separated:
```bash
node index.js --in path/to/file.csv --exclude 1,5,25
```

Run `-h` for help
```bash
node index.js -h
```
