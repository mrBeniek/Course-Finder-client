export const ageConvert = value => {
  let ms = 0;

  switch (value) {
    case 1095:
      ms = 2629800000;
      break;
    case 730:
      ms = 7889400000;
      break;
    case 364:
      ms = 15778800000;
      break;
    case 180:
      ms = 31557600000;
      break;
    case 90:
      ms = 63115200000;
      break;
    case 0:
      ms = 1262304000000;
      break;
    default:
      break;
  }

  return Date.now() - ms;
};
