import { useState, useCallback } from "react";

export function useContactPopup() {
  const [open, setOpen] = useState(false);

  const openPopup = useCallback(() => setOpen(true), []);
  const closePopup = useCallback(() => setOpen(false), []);

  return { open, openPopup, closePopup };
}
