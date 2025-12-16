const day = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

/**
 *
 * @param {number} number
 * @param {boolean} is_unix
 * @returns
 */
export const convertNumberTimeStampInHoursAndMinutes = (number, is_unix = true) => {
  const time = new Date(number * (is_unix ? 10_000 : 1));

  return time.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/**
 *
 * @param {string} timeStamp
 * @returns
 */
export const getDayFromTimeStamp = (timeStamp) => {
  const time = new Date(timeStamp);

  return day[time.getDay()];
};

/**
 *
 * @param {string} timeStamp
 * @returns
 */
export const getShortDayFromTimeStamp = (timeStamp) => {
  const time = new Date(timeStamp);

  return day[time.getDay()].slice(0, 3);
};
