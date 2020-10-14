import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  RefGeoTypeCommuneComponentsPage,
  RefGeoTypeCommuneDeleteDialog,
  RefGeoTypeCommuneUpdatePage,
} from './ref-geo-type-commune.page-object';

const expect = chai.expect;

describe('RefGeoTypeCommune e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoTypeCommuneComponentsPage: RefGeoTypeCommuneComponentsPage;
  let refGeoTypeCommuneUpdatePage: RefGeoTypeCommuneUpdatePage;
  let refGeoTypeCommuneDeleteDialog: RefGeoTypeCommuneDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoTypeCommunes', async () => {
    await navBarPage.goToEntity('ref-geo-type-commune');
    refGeoTypeCommuneComponentsPage = new RefGeoTypeCommuneComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoTypeCommuneComponentsPage.title), 5000);
    expect(await refGeoTypeCommuneComponentsPage.getTitle()).to.eq('sidotApp.refGeoTypeCommune.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoTypeCommuneComponentsPage.entities), ec.visibilityOf(refGeoTypeCommuneComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoTypeCommune page', async () => {
    await refGeoTypeCommuneComponentsPage.clickOnCreateButton();
    refGeoTypeCommuneUpdatePage = new RefGeoTypeCommuneUpdatePage();
    expect(await refGeoTypeCommuneUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoTypeCommune.home.createOrEditLabel');
    await refGeoTypeCommuneUpdatePage.cancel();
  });

  it('should create and save RefGeoTypeCommunes', async () => {
    const nbButtonsBeforeCreate = await refGeoTypeCommuneComponentsPage.countDeleteButtons();

    await refGeoTypeCommuneComponentsPage.clickOnCreateButton();

    await promise.all([refGeoTypeCommuneUpdatePage.setTypeNameInput('typeName')]);

    expect(await refGeoTypeCommuneUpdatePage.getTypeNameInput()).to.eq('typeName', 'Expected TypeName value to be equals to typeName');

    await refGeoTypeCommuneUpdatePage.save();
    expect(await refGeoTypeCommuneUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoTypeCommuneComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RefGeoTypeCommune', async () => {
    const nbButtonsBeforeDelete = await refGeoTypeCommuneComponentsPage.countDeleteButtons();
    await refGeoTypeCommuneComponentsPage.clickOnLastDeleteButton();

    refGeoTypeCommuneDeleteDialog = new RefGeoTypeCommuneDeleteDialog();
    expect(await refGeoTypeCommuneDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoTypeCommune.delete.question');
    await refGeoTypeCommuneDeleteDialog.clickOnConfirmButton();

    expect(await refGeoTypeCommuneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
