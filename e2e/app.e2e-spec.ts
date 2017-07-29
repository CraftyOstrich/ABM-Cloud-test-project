import { ABMCloudPage } from './app.po';

describe('abm-cloud App', () => {
  let page: ABMCloudPage;

  beforeEach(() => {
    page = new ABMCloudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
