export const getBrowserHistoryProvider = () => {
  const getHistoryLocation = () => document.location;
  const provider = window.history;
  const listeners: Function[] = [];

  const onHistoryChange = (listener: () => void) => listeners.push(listener);
  const emitHistoryChange = () => listeners.forEach(listener => listener());
  window.onpopstate = emitHistoryChange;

  return {
    onHistoryChange,
    getHistoryLocation,
    getFullPath: () => {
      const { href, origin } = getHistoryLocation();
      return href.replace(origin, '');
    },
    back: () => provider.back(),
    forward: () => provider.forward(),
    pushState: (...props: TRHistoryPushProps) => {
      provider.pushState(...props);
      emitHistoryChange();
    },
    replaceState: (...props: TRHistoryPushProps) => {
      provider.replaceState(...props);
      emitHistoryChange();
    },
  };
};

export const browserHistoryProvider = getBrowserHistoryProvider();
