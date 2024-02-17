import { useCallback, useState } from "react";

export default function useDialogModal(Component) {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => setOpen(false), []);

  const DialogComponent = useCallback(
    ({ ...props }) => {
      if (!open) return null;

      if (Component) {
        return <Component open={open} onClose={closeDialog} {...props} />;
      }
    },
    [open, Component]
  );

  return [DialogComponent, openDialog, closeDialog];
}
