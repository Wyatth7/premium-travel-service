export interface PageDataButtonModel {
  buttonText: string;
  action: () => Promise<void>;
}
