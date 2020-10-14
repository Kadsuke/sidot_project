import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoLocaliteComponentsPage, RefGeoLocaliteDeleteDialog, RefGeoLocaliteUpdatePage } from './ref-geo-localite.page-object';

const expect = chai.expect;

describe('RefGeoLocalite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoLocaliteComponentsPage: RefGeoLocaliteComponentsPage;
  let refGeoLocaliteUpdatePage: RefGeoLocaliteUpdatePage;
  let refGeoLocaliteDeleteDialog: RefGeoLocaliteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoLocalites', async () => {
    await navBarPage.goToEntity('ref-geo-localite');
    refGeoLocaliteComponentsPage = new RefGeoLocaliteComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoLocaliteComponentsPage.title), 5000);
    expect(await refGeoLocaliteComponentsPage.getTitle()).to.eq('sidotApp.refGeoLocalite.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoLocaliteComponentsPage.entities), ec.visibilityOf(refGeoLocaliteComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoLocalite page', async () => {
    await refGeoLocaliteComponentsPage.clickOnCreateButton();
    refGeoLocaliteUpdatePage = new RefGeoLocaliteUpdatePage();
    expect(await refGeoLocaliteUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoLocalite.home.createOrEditLabel');
    await refGeoLocaliteUpdatePage.cancel();
  });

  it('should create and save RefGeoLocalites', async () => {
    const nbButtonsBeforeCreate = await refGeoLocaliteComponentsPage.countDeleteButtons();

    await refGeoLocaliteComponentsPage.clickOnCreateButton();

    await promise.all([refGeoLocaliteUpdatePage.setLocaliteNameInput('localiteName'), refGeoLocaliteUpdatePage.secteurSelectLastOption()]);

    expect(await refGeoLocaliteUpdatePage.getLocaliteNameInput()).to.eq(
      'localiteName',
      'Expected LocaliteName value to be equals to localiteName'
    );

    await refGeoLocaliteUpdatePage.save();
    expect(await refGeoLocaliteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoLocaliteComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RefGeoLocalite', async () => {
    const nbButtonsBeforeDelete = await refGeoLocaliteComponentsPage.countDeleteButtons();
    await refGeoLocaliteComponentsPage.clickOnLastDeleteButton();

    refGeoLocaliteDeleteDialog = new RefGeoLocaliteDeleteDialog();
    expect(await refGeoLocaliteDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoLocalite.delete.question');
    await refGeoLocaliteDeleteDialog.clickOnConfirmButton();

    expect(await refGeoLocaliteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
