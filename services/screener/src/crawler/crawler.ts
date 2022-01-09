export interface Crawler {
  getSymbols(url: string): Promise<string[]>;
}