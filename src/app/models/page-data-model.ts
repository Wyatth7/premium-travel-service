import { GridItemModel } from './grid-item-model';
import { PageDataButtonModel } from './page-data-button-model';

export interface PageDataModel {
  title: string;
  helperText: string;
  showFooterButtons: boolean;
  buttons?: {
    buttonLeft: PageDataButtonModel;
    buttonRight: PageDataButtonModel;
  };
}
