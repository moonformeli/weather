import { lstatSync, readdirSync, unlink, unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import debug from 'debug';
import nodemon from 'nodemon';
import * as TJS from 'typescript-json-schema';

const log = debug('Luna:JSCBuilder');
log('Starting to create the JSON Schema ...');

const excludes = [
  'pages',
  'server',
  'services',
  'typings',
  'schemas',
  'utils',
  '__tests__'
];
const interfaces: string[] = [];
const basePath = resolve(__dirname, '..');

const shouldInclude = (file: string): boolean => {
  return !excludes.includes(file);
};

const getAllInterfaces = (basePath: string): string[] => {
  const files: string[] = [];

  if (!lstatSync(basePath).isDirectory()) {
    return files;
  }

  readdirSync(basePath)
    .filter(shouldInclude)
    .forEach(f => {
      const fileOrDir = resolve(basePath, f);
      if (lstatSync(fileOrDir).isDirectory()) {
        files.push(...files, ...getAllInterfaces(fileOrDir));
      }

      if (!!fileOrDir.match(/\w+interface/gi)) {
        files.push(fileOrDir);
        interfaces.push(f.replace(/\.ts/, ''));
      }
    });

  return files;
};

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
  aliasRef: true
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true
};

log('Creating the TJS program ...');
const program = TJS.getProgramFromFiles(
  getAllInterfaces(basePath).filter(file => file.includes('Interface')),
  compilerOptions,
  basePath
);

log('Creating the TJS generator ...');
const generator = TJS.buildGenerator(program, settings);

log(`${interfaces.length} transformable interfaces are found ...`);

log('Removing the existing files in Schemas ...');
readdirSync(resolve(basePath, 'schemas')).forEach(file => {
  unlinkSync(resolve(basePath, 'schemas', file));
});

log('Trying to obtain the JSON Schema ...');

const prefix = 'export default';

generator
  ?.getUserSymbols()
  .filter(symbol => !!symbol.match(/I\w+Interface/g))
  .forEach(symbol => {
    const schema = generator.getSchemaForSymbol(symbol);
    const data = `${prefix} ${JSON.stringify(schema, null, 2)}`;

    log(`Trying to write the file - ${symbol} ...`);
    writeFileSync(resolve(basePath, 'schemas', `${symbol}JSC.ts`), data);
  });
log('Creating the JSON Schema has been completed');

nodemon.emit('quit', 200);
process.exit();
