// fs ('file system') is a standard Node module 
// (need to install type definitions for Node)
import fs from 'fs';
import { dateStringToDate } from './utils';
import { MatchResult } from './MatchResult';

type MatchData = [
  Date, 
  string, 
  string, 
  number, 
  number, 
  MatchResult, 
  string
];

export class CsvFileReader {
  data: MatchData[] = [];

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
    })
    .map((row: string[]): MatchData => {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchResult, // "type assertion"
        row[6]
      ]
    });
  }
}