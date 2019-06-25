export interface ConfirmationDialogData {
  title?: string;
  message?: string;
  okButton?: string;
  okButtonClass?: 'warn' | 'primary' | 'accent';
  cancelButton?: string;
  archiveAllRocks: boolean;
  isRock: boolean;
}
