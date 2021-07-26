export const dateConverter = value => {
  const today = Date.now();
  const creationDate = Date.parse(value);
  const days = Math.floor((today - creationDate) / 8.64e7);
  let result = '';

  switch (true) {
    case days === 0:
      result = 'NEW';
      break;
    case days > 0 && days < 61:
      result = days + 'd';
      break;
    case days >= 61 && days < 365:
      result = Math.floor(days / 30) + 'm';
      break;
    case days >= 365 && days < 730:
      result = '1y+';
      break;
    case days >= 730 && days < 1095:
      result = '2y+';
      break;
    case days >= 1095:
      result = '3y+';
      break;
    default:
      break;
  }

  return result;
};
