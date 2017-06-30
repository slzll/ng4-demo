import { browser, by, element } from 'protractor';

export class NG2StudyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root div')).getText();
  }
}
