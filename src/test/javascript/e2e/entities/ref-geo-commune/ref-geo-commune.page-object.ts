import { element, by, ElementFinder } from 'protractor';

export class RefGeoCommuneComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-geo-commune div table .btn-danger'));
  title = element.all(by.css('jhi-ref-geo-commune div h2#page-heading span')).first();
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

export class RefGeoCommuneUpdatePage {
  pageTitle = element(by.id('jhi-ref-geo-commune-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  communeNameInput = element(by.id('field_communeName'));

  provinceSelect = element(by.id('field_province'));
  typecommuneSelect = element(by.id('field_typecommune'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCommuneNameInput(communeName: string): Promise<void> {
    await this.communeNameInput.sendKeys(communeName);
  }

  async getCommuneNameInput(): Promise<string> {
    return await this.communeNameInput.getAttribute('value');
  }

  async provinceSelectLastOption(): Promise<void> {
    await this.provinceSelect.all(by.tagName('option')).last().click();
  }

  async provinceSelectOption(option: string): Promise<void> {
    await this.provinceSelect.sendKeys(option);
  }

  getProvinceSelect(): ElementFinder {
    return this.provinceSelect;
  }

  async getProvinceSelectedOption(): Promise<string> {
    return await this.provinceSelect.element(by.css('option:checked')).getText();
  }

  async typecommuneSelectLastOption(): Promise<void> {
    await this.typecommuneSelect.all(by.tagName('option')).last().click();
  }

  async typecommuneSelectOption(option: string): Promise<void> {
    await this.typecommuneSelect.sendKeys(option);
  }

  getTypecommuneSelect(): ElementFinder {
    return this.typecommuneSelect;
  }

  async getTypecommuneSelectedOption(): Promise<string> {
    return await this.typecommuneSelect.element(by.css('option:checked')).getText();
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

export class RefGeoCommuneDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refGeoCommune-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refGeoCommune'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
