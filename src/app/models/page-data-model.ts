import { GridItemModel } from './grid-item-model';

export interface PageDataModel {
  title: string;
  helperText: string;
  gridData: GridItemModel[];
  showFooterButtons: boolean;
}
