import { element, by, ElementFinder } from 'protractor';

export class RefGeoLocaliteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-geo-localite div table .btn-danger'));
  title = element.all(by.css('jhi-ref-geo-localite div h2#page-heading span')).first();
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

export class RefGeoLocaliteUpdatePage {
  pageTitle = element(by.id('jhi-ref-geo-localite-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  localiteNameInput = element(by.id('field_localiteName'));

  secteurSelect = element(by.id('field_secteur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLocaliteNameInput(localiteName: string): Promise<void> {
    await this.localiteNameInput.sendKeys(localiteName);
  }

  async getLocaliteNameInput(): Promise<string> {
    return await this.localiteNameInput.getAttribute('value');
  }

  async secteurSelectLastOption(): Promise<void> {
    await this.secteurSelect.all(by.tagName('option')).last().click();
  }

  async secteurSelectOption(option: string): Promise<void> {
    await this.secteurSelect.sendKeys(option);
  }

  getSecteurSelect(): ElementFinder {
    return this.secteurSelect;
  }

  async getSecteurSelectedOption(): Promise<string> {
    return await this.secteurSelect.element(by.css('option:checked')).getText();
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

export class RefGeoLocaliteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refGeoLocalite-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refGeoLocalite'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
