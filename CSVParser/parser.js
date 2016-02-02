import { version } from './package.json';
import program from 'commander';
import fs from 'fs';
import { parse, transform } from 'csv';
import { getDistance, convertUnit } from 'geolib';

program
  .version(version)
  .usage('[options] --in path/to/file.csv')
  .option('-i, --in <in>', 'Sorce file path of CSV')
  .option('-e, --exclude <items>', 'Comma separated user ids to exclude')
  .parse(process.argv);

function exclude(val) {
  return val.split(',');
}

let excludeIds = [];
if (program.exclude && program.exclude.length){
  excludeIds = program.exclude.split(',');
}

console.log('Exclude User Ids: ' + excludeIds);

let source = program.in || './example.csv';
let output = {};

let parser = parse({
  delimiter: ',',
  skip_empty_lines: true,
  columns: true
});

let input = fs.createReadStream(source);

const grouper = transform( (record, next) => {
  let lvl = record.nivel;
  let type = (lvl === 'bajo' || lvl === 'alto' ? lvl : 'unknown');
  let id = record.id.toString();

  if (!output[type]) {
    output[type] = {};
  }

  if (excludeIds.indexOf(id) === -1){

    if (!output[type][id]) {
      output[type][id] = [];
    }

    if (record.latitud && record.longitud){
      output[type][id].push({
        latitude: parseFloat(record.latitud),
        longitude: parseFloat(record.longitud)
      });
    }
  }

  next();

}, { parallel: 10 });

const calculateAll = () => {
  let data = {
    count: {},
    totals: {},
    average: {}
  };

  for (var type in output){

    if (!data[type]){
      data[type] = {};
      data.totals[type] = 0;
    }

    for (var id in output[type]){

      if (!data[type][id]){
        data[type][id] = 0;
      }

      let coords = output[type][id];
      let i = 0;
      while(i < coords.length-1) {
        data[type][id] += getDistance(coords[i], coords[i+1]);
        i++;
      }

      // to KM
      data[type][id] = convertUnit('km', data[type][id], 2);

      data.count[id] = coords.length;

      data.totals[type] += data[type][id];
      data.totals[type] = parseFloat(data.totals[type].toFixed(2));
    }

    data.average[type] = parseFloat((data.totals[type] / Object.keys(output[type]).length).toFixed(2));
  }

  console.dir(data);
  process.exit(1);
};

input.pipe(parser).pipe(grouper);
input.on('end', calculateAll);
