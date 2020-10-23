import { MatchData } from './MatchData';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { HtmlReport } from './reportTargets/HtmlReport';

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

// using object composition pattern here, so when we create an instance 
// of class Summary, we need to pass in to the constructor objects that 
// satisfy the Analyzer and OutputTarget interfaces
export class Summary {
  // static methods can be called off the class itself without 
  // creating an instance of the class
  static winsAnalysisWithHtmlReport(team: string): Summary {
    return new Summary(
      new WinsAnalysis(team),
      new HtmlReport()
    );
  }

  constructor(
    public analyzer: Analyzer, 
    public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}

