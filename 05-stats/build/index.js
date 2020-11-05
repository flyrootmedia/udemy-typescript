"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchReader_Interfaces_1 = require("./MatchReader-Interfaces");
// import { CsvFileReader } from './CsvFileReader-Interfaces';
// import { ConsoleReport } from './reportTargets/ConsoleReport';
// import { HtmlReport } from './reportTargets/HtmlReport';
// import { WinsAnalysis } from './analyzers/WinsAnalysis';
var Summary_1 = require("./Summary");
// Abstract Generics version:
// const reader = new MatchReader('football.csv');
// reader.read();
// Interfaces version: 
// create an object that satisfies the 'DataReader' interface
// const csvFileReader = new CsvFileReader('football.csv')
// Interfaces version:
// create an instance of MatchReader and pass in something satisfying 
// the 'DataReader' interface
// const matchReader = new MatchReader(csvFileReader);
// shortcut using a static method which returns an instance of MatchReader
var matchReader = MatchReader_Interfaces_1.MatchReader.fromCsv('football.csv');
matchReader.load();
// const summary = new Summary(
//   new WinsAnalysis('Man United'),
//   new HtmlReport()
// );
// shortcut using a static method which returns an instance of Summary
var summary = Summary_1.Summary.winsAnalysisWithHtmlReport('Man United');
summary.buildAndPrintReport(matchReader.matches);
