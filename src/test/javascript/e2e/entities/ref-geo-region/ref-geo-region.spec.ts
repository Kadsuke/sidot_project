import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoRegionComponentsPage, RefGeoRegionDeleteDialog, RefGeoRegionUpdatePage } from './ref-geo-region.page-object';

const expect = chai.expect;

describe('RefGeoRegion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoRegionComponentsPage: RefGeoRegionComponentsPage;
  let refGeoRegionUpdatePage: RefGeoRegionUpdatePage;
  let refGeoRegionDeleteDialog: RefGeoRegionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoRegions', async () => {
    await navBarPage.goToEntity('ref-geo-region');
    refGeoRegionComponentsPage = new RefGeoRegionComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoRegionComponentsPage.title), 5000);
    expect(await refGeoRegionComponentsPage.getTitle()).to.eq('sidotApp.refGeoRegion.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoRegionComponentsPage.entities), ec.visibilityOf(refGeoRegionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoRegion page', async () => {
    await refGeoRegionComponentsPage.clickOnCreateButton();
    refGeoRegionUpdatePage = new RefGeoRegionUpdatePage();
    expect(await refGeoRegionUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoRegion.home.createOrEditLabel');
    await refGeoRegionUpdatePage.cancel();
  });

  it('should create and save RefGeoRegions', async () => {
    const nbButtonsBeforeCreate = await refGeoRegionComponentsPage.countDeleteButtons();

    await refGeoRegionComponentsPage.clickOnCreateButton();

    await promise.all([refGeoRegionUpdatePage.setRegionNameInput('regionName')]);

    expect(await refGeoRegionUpdatePage.getRegionNameInput()).to.eq('regionName', 'Expected RegionName value to be equals to regionName');

    await refGeoRegionUpdatePage.save();
    expect(await refGeoRegionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoRegionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RefGeoRegion', async () => {
    const nbButtonsBeforeDelete = await refGeoRegionComponentsPage.countDeleteButtons();
    await refGeoRegionComponentsPage.clickOnLastDeleteButton();

    refGeoRegionDeleteDialog = new RefGeoRegionDeleteDialog();
    expect(await refGeoRegionDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoRegion.delete.question');
    await refGeoRegionDeleteDialog.clickOnConfirmButton();

    expect(await refGeoRegionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
