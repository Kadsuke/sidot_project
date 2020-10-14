import { element, by, ElementFinder } from 'protractor';

export class RefGeoLotComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-geo-lot div table .btn-danger'));
  title = element.all(by.css('jhi-ref-geo-lot div h2#page-heading span')).first();
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

export class RefGeoLotUpdatePage {
  pageTitle = element(by.id('jhi-ref-geo-lot-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  lotNameInput = element(by.id('field_lotName'));

  parcelleSelect = element(by.id('field_parcelle'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLotNameInput(lotName: string): Promise<void> {
    await this.lotNameInput.sendKeys(lotName);
  }

  async getLotNameInput(): Promise<string> {
    return await this.lotNameInput.getAttribute('value');
  }

  async parcelleSelectLastOption(): Promise<void> {
    await this.parcelleSelect.all(by.tagName('option')).last().click();
  }

  async parcelleSelectOption(option: string): Promise<void> {
    await this.parcelleSelect.sendKeys(option);
  }

  getParcelleSelect(): ElementFinder {
    return this.parcelleSelect;
  }

  async getParcelleSelectedOption(): Promise<string> {
    return await this.parcelleSelect.element(by.css('option:checked')).getText();
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

export class RefGeoLotDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refGeoLot-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refGeoLot'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
