// "Composition" version referencing a different type of reader

// fs ('file system') is a standard Node module 
// (need to install type definitions for Node)
import fs from 'fs';

export class CsvFileReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  read(): void {
    // utf-8 encoding tells readFileSync to give us a string of the file text 
    // as opposed to the raw data so we can parse it
    this.data = fs.readFileSync(this.filename, {
      encoding: 'utf-8'
    })
    .split('\n')
    .map((row: string): string[] => {
      return row.split(',');
    });
  }
}