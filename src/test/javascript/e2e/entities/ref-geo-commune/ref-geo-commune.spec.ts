import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoCommuneComponentsPage, RefGeoCommuneDeleteDialog, RefGeoCommuneUpdatePage } from './ref-geo-commune.page-object';

const expect = chai.expect;

describe('RefGeoCommune e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoCommuneComponentsPage: RefGeoCommuneComponentsPage;
  let refGeoCommuneUpdatePage: RefGeoCommuneUpdatePage;
  let refGeoCommuneDeleteDialog: RefGeoCommuneDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoCommunes', async () => {
    await navBarPage.goToEntity('ref-geo-commune');
    refGeoCommuneComponentsPage = new RefGeoCommuneComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoCommuneComponentsPage.title), 5000);
    expect(await refGeoCommuneComponentsPage.getTitle()).to.eq('sidotApp.refGeoCommune.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoCommuneComponentsPage.entities), ec.visibilityOf(refGeoCommuneComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoCommune page', async () => {
    await refGeoCommuneComponentsPage.clickOnCreateButton();
    refGeoCommuneUpdatePage = new RefGeoCommuneUpdatePage();
    expect(await refGeoCommuneUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoCommune.home.createOrEditLabel');
    await refGeoCommuneUpdatePage.cancel();
  });

  it('should create and save RefGeoCommunes', async () => {
    const nbButtonsBeforeCreate = await refGeoCommuneComponentsPage.countDeleteButtons();

    await refGeoCommuneComponentsPage.clickOnCreateButton();

    await promise.all([
      refGeoCommuneUpdatePage.setCommuneNameInput('communeName'),
      refGeoCommuneUpdatePage.provinceSelectLastOption(),
      refGeoCommuneUpdatePage.typecommuneSelectLastOption(),
    ]);

    expect(await refGeoCommuneUpdatePage.getCommuneNameInput()).to.eq(
      'communeName',
      'Expected CommuneName value to be equals to communeName'
    );

    await refGeoCommuneUpdatePage.save();
    expect(await refGeoCommuneUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoCommuneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RefGeoCommune', async () => {
    const nbButtonsBeforeDelete = await refGeoCommuneComponentsPage.countDeleteButtons();
    await refGeoCommuneComponentsPage.clickOnLastDeleteButton();

    refGeoCommuneDeleteDialog = new RefGeoCommuneDeleteDialog();
    expect(await refGeoCommuneDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoCommune.delete.question');
    await refGeoCommuneDeleteDialog.clickOnConfirmButton();

    expect(await refGeoCommuneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
