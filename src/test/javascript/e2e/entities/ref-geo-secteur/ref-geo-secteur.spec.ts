import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RefGeoSecteurComponentsPage, RefGeoSecteurDeleteDialog, RefGeoSecteurUpdatePage } from './ref-geo-secteur.page-object';

const expect = chai.expect;

describe('RefGeoSecteur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let refGeoSecteurComponentsPage: RefGeoSecteurComponentsPage;
  let refGeoSecteurUpdatePage: RefGeoSecteurUpdatePage;
  let refGeoSecteurDeleteDialog: RefGeoSecteurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RefGeoSecteurs', async () => {
    await navBarPage.goToEntity('ref-geo-secteur');
    refGeoSecteurComponentsPage = new RefGeoSecteurComponentsPage();
    await browser.wait(ec.visibilityOf(refGeoSecteurComponentsPage.title), 5000);
    expect(await refGeoSecteurComponentsPage.getTitle()).to.eq('sidotApp.refGeoSecteur.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(refGeoSecteurComponentsPage.entities), ec.visibilityOf(refGeoSecteurComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RefGeoSecteur page', async () => {
    await refGeoSecteurComponentsPage.clickOnCreateButton();
    refGeoSecteurUpdatePage = new RefGeoSecteurUpdatePage();
    expect(await refGeoSecteurUpdatePage.getPageTitle()).to.eq('sidotApp.refGeoSecteur.home.createOrEditLabel');
    await refGeoSecteurUpdatePage.cancel();
  });

  it('should create and save RefGeoSecteurs', async () => {
    const nbButtonsBeforeCreate = await refGeoSecteurComponentsPage.countDeleteButtons();

    await refGeoSecteurComponentsPage.clickOnCreateButton();

    await promise.all([refGeoSecteurUpdatePage.setSecteurNameInput('secteurName'), refGeoSecteurUpdatePage.sectionSelectLastOption()]);

    expect(await refGeoSecteurUpdatePage.getSecteurNameInput()).to.eq(
      'secteurName',
      'Expected SecteurName value to be equals to secteurName'
    );

    await refGeoSecteurUpdatePage.save();
    expect(await refGeoSecteurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await refGeoSecteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RefGeoSecteur', async () => {
    const nbButtonsBeforeDelete = await refGeoSecteurComponentsPage.countDeleteButtons();
    await refGeoSecteurComponentsPage.clickOnLastDeleteButton();

    refGeoSecteurDeleteDialog = new RefGeoSecteurDeleteDialog();
    expect(await refGeoSecteurDeleteDialog.getDialogTitle()).to.eq('sidotApp.refGeoSecteur.delete.question');
    await refGeoSecteurDeleteDialog.clickOnConfirmButton();

    expect(await refGeoSecteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
