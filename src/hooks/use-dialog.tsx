import useDialogStore from '@src/store/use-dialog-store';

/** Hook to use dialog cleanly */
export default function useDialog() {
  return useDialogStore.useDialog();
}
