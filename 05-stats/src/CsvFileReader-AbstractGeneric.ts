// Inheritence Version (using abstract generic class)

// fs ('file system') is a standard Node module 
// (need to install type definitions for Node)
import fs from 'fs';

// generic absract class; allows you to extend it
// and pass any type you need for the CSV data
export abstract class CsvFileReader<T> {
  data: T[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  read(): void {
    // utf-8 encoding tells readFileSync to give us a string of the file text 
    // as opposed to the raw data so we can parse it
    this.data = fs.readFileSync(this.filename, {
      encoding: 'utf-8'
    })
    .split('\n')
    .map((row: string): string[] => {
      return row.split(',');
    })
    .map(this.mapRow);
  }
}