import useDialogStore from '@src/store/useDialogStore';

/** Hook to use dialog cleanly */
export default function useDialog() {
  return useDialogStore.useDialog();
}
