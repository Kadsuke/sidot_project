import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoLotComponentsPage, RefGeoLotDeleteDialog, RefGeoLotUpdatePage } from './ref-geo-lot.page-object';

const expect = chai.expect;

describe('RefGeoLot e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoLotComponentsPage: RefGeoLotComponentsPage;
  let refGeoLotUpdatePage: RefGeoLotUpdatePage;
  let refGeoLotDeleteDialog: RefGeoLotDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoLots', async () => {
    await navBarPage.goToEntity('ref-geo-lot');
    refGeoLotComponentsPage = new RefGeoLotComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoLotComponentsPage.title), 5000);
    expect(await refGeoLotComponentsPage.getTitle()).to.eq('sidotApp.refGeoLot.home.title');
    await browser.wait(ec.or(ec.visibilityOf(refGeoLotComponentsPage.entities), ec.visibilityOf(refGeoLotComponentsPage.noResult)), 1000);
  });

  it('should load create RefGeoLot page', async () => {
    await refGeoLotComponentsPage.clickOnCreateButton();
    refGeoLotUpdatePage = new RefGeoLotUpdatePage();
    expect(await refGeoLotUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoLot.home.createOrEditLabel');
    await refGeoLotUpdatePage.cancel();
  });

  it('should create and save RefGeoLots', async () => {
    const nbButtonsBeforeCreate = await refGeoLotComponentsPage.countDeleteButtons();

    await refGeoLotComponentsPage.clickOnCreateButton();

    await promise.all([refGeoLotUpdatePage.setLotNameInput('lotName'), refGeoLotUpdatePage.sectionSelectLastOption()]);

    expect(await refGeoLotUpdatePage.getLotNameInput()).to.eq('lotName', 'Expected LotName value to be equals to lotName');

    await refGeoLotUpdatePage.save();
    expect(await refGeoLotUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoLotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RefGeoLot', async () => {
    const nbButtonsBeforeDelete = await refGeoLotComponentsPage.countDeleteButtons();
    await refGeoLotComponentsPage.clickOnLastDeleteButton();

    refGeoLotDeleteDialog = new RefGeoLotDeleteDialog();
    expect(await refGeoLotDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoLot.delete.question');
    await refGeoLotDeleteDialog.clickOnConfirmButton();

    expect(await refGeoLotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
