import { useCallback } from 'react';

export const useToast = () => {
  return useCallback(({ text, error }) => {
    if (window.M && text) {
      window.M.toast({
        classes: error ? 'toast-error' : 'toast-success',
        html: text,
      });
    }
  }, []);
};
