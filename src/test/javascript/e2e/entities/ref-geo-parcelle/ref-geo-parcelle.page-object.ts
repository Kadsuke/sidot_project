import { element, by, ElementFinder } from 'protractor';

export class RefGeoParcelleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-geo-parcelle div table .btn-danger'));
  title = element.all(by.css('jhi-ref-geo-parcelle div h2#page-heading span')).first();
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

export class RefGeoParcelleUpdatePage {
  pageTitle = element(by.id('jhi-ref-geo-parcelle-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  parcelleNameInput = element(by.id('field_parcelleName'));

  lotSelect = element(by.id('field_lot'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setParcelleNameInput(parcelleName: string): Promise<void> {
    await this.parcelleNameInput.sendKeys(parcelleName);
  }

  async getParcelleNameInput(): Promise<string> {
    return await this.parcelleNameInput.getAttribute('value');
  }

  async lotSelectLastOption(): Promise<void> {
    await this.lotSelect.all(by.tagName('option')).last().click();
  }

  async lotSelectOption(option: string): Promise<void> {
    await this.lotSelect.sendKeys(option);
  }

  getLotSelect(): ElementFinder {
    return this.lotSelect;
  }

  async getLotSelectedOption(): Promise<string> {
    return await this.lotSelect.element(by.css('option:checked')).getText();
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

export class RefGeoParcelleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refGeoParcelle-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refGeoParcelle'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
