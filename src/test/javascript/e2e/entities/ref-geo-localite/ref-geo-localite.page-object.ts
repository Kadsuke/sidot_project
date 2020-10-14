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

  communeSelect = element(by.id('field_commune'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLocaliteNameInput(localiteName: string): Promise<void> {
    await this.localiteNameInput.sendKeys(localiteName);
  }

  async getLocaliteNameInput(): Promise<string> {
    return await this.localiteNameInput.getAttribute('value');
  }

  async communeSelectLastOption(): Promise<void> {
    await this.communeSelect.all(by.tagName('option')).last().click();
  }

  async communeSelectOption(option: string): Promise<void> {
    await this.communeSelect.sendKeys(option);
  }

  getCommuneSelect(): ElementFinder {
    return this.communeSelect;
  }

  async getCommuneSelectedOption(): Promise<string> {
    return await this.communeSelect.element(by.css('option:checked')).getText();
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
