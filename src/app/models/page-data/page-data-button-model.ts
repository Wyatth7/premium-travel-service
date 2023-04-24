export interface PageDataButtonModel {
  buttonText: string;
  showButton: boolean;
  action: () => Promise<void>;
  disable?: boolean;
}
