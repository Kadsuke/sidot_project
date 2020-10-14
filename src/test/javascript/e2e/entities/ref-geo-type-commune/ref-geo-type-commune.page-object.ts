import { element, by, ElementFinder } from 'protractor';

export class RefGeoTypeCommuneComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-geo-type-commune div table .btn-danger'));
  title = element.all(by.css('jhi-ref-geo-type-commune div h2#page-heading span')).first();
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

export class RefGeoTypeCommuneUpdatePage {
  pageTitle = element(by.id('jhi-ref-geo-type-commune-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  typeNameInput = element(by.id('field_typeName'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTypeNameInput(typeName: string): Promise<void> {
    await this.typeNameInput.sendKeys(typeName);
  }

  async getTypeNameInput(): Promise<string> {
    return await this.typeNameInput.getAttribute('value');
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

export class RefGeoTypeCommuneDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refGeoTypeCommune-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refGeoTypeCommune'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
