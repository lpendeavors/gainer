import { Crawler } from "./crawler";
import { Builder, By } from "selenium-webdriver";
import chrome, { Driver } from "selenium-webdriver/chrome";
import chromedriver from "chromedriver";
import { DriverService } from "selenium-webdriver/remote";

export class FinvizCrawler implements Crawler {
  private _symbols: string[] = [];
  private _driverService: DriverService = new chrome.ServiceBuilder(chromedriver.path).build();

  constructor() {
    chrome.setDefaultService(this._driverService);
  }
  
  public async getSymbols(url: string): Promise<string[]> {
    const options = new chrome.Options()
      .addArguments('disable-blink-features=AutomationControlled')
      .addArguments('user-agent=Type user agent here')
      .addArguments('--headless');

    const driver = new Builder()
      .forBrowser('chrome')
      .withCapabilities(options)
      .build();

    try {
      await driver.get(url);
      await this.getSymbolsFromPage(driver);
      while (await this.nextPageLink(driver) !== null)
      {
        const link = await this.nextPageLink(driver);
        await driver.navigate().to(link!);
        await this.getSymbolsFromPage(driver);
      }
      await driver.close();
    } catch (e) {
      console.error(e);
    }

    return this._symbols;
  }

  private async getSymbolsFromPage(driver: Driver) {
    const tickerLinks = await driver.findElements(By.className('screener-link-primary'));
    for (const item of tickerLinks) {
      const symbol = await item.getText();
      this._symbols.push(symbol);
    }
  }

  private async nextPageLink(driver: Driver): Promise<string | null> {
    const pagination = await driver.findElement(By.className('screener_pagination'));
    const paginationLinks = await pagination.findElements(By.xpath('./*'));
    const lastLink = paginationLinks[paginationLinks.length-1];
    
    if (await lastLink.getText() === 'next') {
      return await lastLink.getAttribute('href');
    }
    
    return null;
  }
}