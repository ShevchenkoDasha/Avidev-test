export const Keys = {
  Enter: 'Enter',
  Space: ' ',
};

export const handleKeyDownEnterSpace = (
  event: React.KeyboardEvent,
  callback: () => void,
) => {
  if ([Keys.Enter, Keys.Space].includes(event.key)) {
    callback();
  }
};
