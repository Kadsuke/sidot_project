import { element, by, ElementFinder } from 'protractor';

export class RefGeoRegionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ref-geo-region div table .btn-danger'));
  title = element.all(by.css('jhi-ref-geo-region div h2#page-heading span')).first();
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

export class RefGeoRegionUpdatePage {
  pageTitle = element(by.id('jhi-ref-geo-region-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  regionNameInput = element(by.id('field_regionName'));

  provinceSelect = element(by.id('field_province'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRegionNameInput(regionName: string): Promise<void> {
    await this.regionNameInput.sendKeys(regionName);
  }

  async getRegionNameInput(): Promise<string> {
    return await this.regionNameInput.getAttribute('value');
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

export class RefGeoRegionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-refGeoRegion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-refGeoRegion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
