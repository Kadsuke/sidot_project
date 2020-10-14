import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoProvinceComponentsPage, RefGeoProvinceDeleteDialog, RefGeoProvinceUpdatePage } from './ref-geo-province.page-object';

const expect = chai.expect;

describe('RefGeoProvince e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoProvinceComponentsPage: RefGeoProvinceComponentsPage;
  let refGeoProvinceUpdatePage: RefGeoProvinceUpdatePage;
  let refGeoProvinceDeleteDialog: RefGeoProvinceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoProvinces', async () => {
    await navBarPage.goToEntity('ref-geo-province');
    refGeoProvinceComponentsPage = new RefGeoProvinceComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoProvinceComponentsPage.title), 5000);
    expect(await refGeoProvinceComponentsPage.getTitle()).to.eq('sidotApp.refGeoProvince.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoProvinceComponentsPage.entities), ec.visibilityOf(refGeoProvinceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoProvince page', async () => {
    await refGeoProvinceComponentsPage.clickOnCreateButton();
    refGeoProvinceUpdatePage = new RefGeoProvinceUpdatePage();
    expect(await refGeoProvinceUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoProvince.home.createOrEditLabel');
    await refGeoProvinceUpdatePage.cancel();
  });

  it('should create and save RefGeoProvinces', async () => {
    const nbButtonsBeforeCreate = await refGeoProvinceComponentsPage.countDeleteButtons();

    await refGeoProvinceComponentsPage.clickOnCreateButton();

    await promise.all([refGeoProvinceUpdatePage.setProvinceNameInput('provinceName'), refGeoProvinceUpdatePage.communeSelectLastOption()]);

    expect(await refGeoProvinceUpdatePage.getProvinceNameInput()).to.eq(
      'provinceName',
      'Expected ProvinceName value to be equals to provinceName'
    );

    await refGeoProvinceUpdatePage.save();
    expect(await refGeoProvinceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoProvinceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RefGeoProvince', async () => {
    const nbButtonsBeforeDelete = await refGeoProvinceComponentsPage.countDeleteButtons();
    await refGeoProvinceComponentsPage.clickOnLastDeleteButton();

    refGeoProvinceDeleteDialog = new RefGeoProvinceDeleteDialog();
    expect(await refGeoProvinceDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoProvince.delete.question');
    await refGeoProvinceDeleteDialog.clickOnConfirmButton();

    expect(await refGeoProvinceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
