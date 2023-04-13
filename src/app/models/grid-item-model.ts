export interface GridItemModel {
  id: string;
  title: string;
  func: () => Promise<any>;
}
