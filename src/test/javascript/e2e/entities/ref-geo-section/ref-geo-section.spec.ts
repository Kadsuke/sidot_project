import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoSectionComponentsPage, RefGeoSectionDeleteDialog, RefGeoSectionUpdatePage } from './ref-geo-section.page-object';

const expect = chai.expect;

describe('RefGeoSection e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoSectionComponentsPage: RefGeoSectionComponentsPage;
  let refGeoSectionUpdatePage: RefGeoSectionUpdatePage;
  let refGeoSectionDeleteDialog: RefGeoSectionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoSections', async () => {
    await navBarPage.goToEntity('ref-geo-section');
    refGeoSectionComponentsPage = new RefGeoSectionComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoSectionComponentsPage.title), 5000);
    expect(await refGeoSectionComponentsPage.getTitle()).to.eq('sidotApp.refGeoSection.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoSectionComponentsPage.entities), ec.visibilityOf(refGeoSectionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoSection page', async () => {
    await refGeoSectionComponentsPage.clickOnCreateButton();
    refGeoSectionUpdatePage = new RefGeoSectionUpdatePage();
    expect(await refGeoSectionUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoSection.home.createOrEditLabel');
    await refGeoSectionUpdatePage.cancel();
  });

  it('should create and save RefGeoSections', async () => {
    const nbButtonsBeforeCreate = await refGeoSectionComponentsPage.countDeleteButtons();

    await refGeoSectionComponentsPage.clickOnCreateButton();

    await promise.all([refGeoSectionUpdatePage.setSectionNameInput('sectionName'), refGeoSectionUpdatePage.secteurSelectLastOption()]);

    expect(await refGeoSectionUpdatePage.getSectionNameInput()).to.eq(
      'sectionName',
      'Expected SectionName value to be equals to sectionName'
    );

    await refGeoSectionUpdatePage.save();
    expect(await refGeoSectionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoSectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RefGeoSection', async () => {
    const nbButtonsBeforeDelete = await refGeoSectionComponentsPage.countDeleteButtons();
    await refGeoSectionComponentsPage.clickOnLastDeleteButton();

    refGeoSectionDeleteDialog = new RefGeoSectionDeleteDialog();
    expect(await refGeoSectionDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoSection.delete.question');
    await refGeoSectionDeleteDialog.clickOnConfirmButton();

    expect(await refGeoSectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
