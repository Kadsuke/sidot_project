import { element, by, ElementFinder } from 'protractor';

export class RefGeoSecteurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-geo-secteur div table .btn-danger'));
  title = element.all(by.css('jhi-ref-geo-secteur div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class RefGeoSecteurUpdatePage {
  pageTitle = element(by.id('jhi-ref-geo-secteur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  secteurNameInput = element(by.id('field_secteurName'));

  localiteSelect = element(by.id('field_localite'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSecteurNameInput(secteurName: string): Promise<void> {
    await this.secteurNameInput.sendKeys(secteurName);
  }

  async getSecteurNameInput(): Promise<string> {
    return await this.secteurNameInput.getAttribute('value');
  }

  async localiteSelectLastOption(): Promise<void> {
    await this.localiteSelect.all(by.tagName('option')).last().click();
  }

  async localiteSelectOption(option: string): Promise<void> {
    await this.localiteSelect.sendKeys(option);
  }

  getLocaliteSelect(): ElementFinder {
    return this.localiteSelect;
  }

  async getLocaliteSelectedOption(): Promise<string> {
    return await this.localiteSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RefGeoSecteurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refGeoSecteur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refGeoSecteur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
