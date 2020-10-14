import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoParcelleComponentsPage, RefGeoParcelleDeleteDialog, RefGeoParcelleUpdatePage } from './ref-geo-parcelle.page-object';

const expect = chai.expect;

describe('RefGeoParcelle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoParcelleComponentsPage: RefGeoParcelleComponentsPage;
  let refGeoParcelleUpdatePage: RefGeoParcelleUpdatePage;
  let refGeoParcelleDeleteDialog: RefGeoParcelleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoParcelles', async () => {
    await navBarPage.goToEntity('ref-geo-parcelle');
    refGeoParcelleComponentsPage = new RefGeoParcelleComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoParcelleComponentsPage.title), 5000);
    expect(await refGeoParcelleComponentsPage.getTitle()).to.eq('sidotApp.refGeoParcelle.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoParcelleComponentsPage.entities), ec.visibilityOf(refGeoParcelleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoParcelle page', async () => {
    await refGeoParcelleComponentsPage.clickOnCreateButton();
    refGeoParcelleUpdatePage = new RefGeoParcelleUpdatePage();
    expect(await refGeoParcelleUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoParcelle.home.createOrEditLabel');
    await refGeoParcelleUpdatePage.cancel();
  });

  it('should create and save RefGeoParcelles', async () => {
    const nbButtonsBeforeCreate = await refGeoParcelleComponentsPage.countDeleteButtons();

    await refGeoParcelleComponentsPage.clickOnCreateButton();

    await promise.all([refGeoParcelleUpdatePage.setParcelleNameInput('parcelleName')]);

    expect(await refGeoParcelleUpdatePage.getParcelleNameInput()).to.eq(
      'parcelleName',
      'Expected ParcelleName value to be equals to parcelleName'
    );

    await refGeoParcelleUpdatePage.save();
    expect(await refGeoParcelleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoParcelleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RefGeoParcelle', async () => {
    const nbButtonsBeforeDelete = await refGeoParcelleComponentsPage.countDeleteButtons();
    await refGeoParcelleComponentsPage.clickOnLastDeleteButton();

    refGeoParcelleDeleteDialog = new RefGeoParcelleDeleteDialog();
    expect(await refGeoParcelleDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoParcelle.delete.question');
    await refGeoParcelleDeleteDialog.clickOnConfirmButton();

    expect(await refGeoParcelleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
