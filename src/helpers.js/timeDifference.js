function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than a minute ago";
  } else if (elapsed < milliSecondsPerHour) {
    return `${Math.round(elapsed / milliSecpndsPerMinute)} min ago`;
  } else if (elapsed < milliSecondsPerDay) {
    return `${Math.round(elapsed / milliSecpndsPerHour)} h ago`;
  } else if (elapsed < milliSecondsPerMonth) {
    return `${Math.round(elapsed / milliSecpndsPerDay)} days ago`;
  } else if (elapsed < milliSecondsPerYear) {
    return `${Math.round(elapsed / milliSecpndsPerMonth)} mo ago`;
  } else {
    return `${Math.round(elapsed / milliSecpndsPerYear)} years ago`;
  }
}

export default function timeDiffernceForDate(date) {
  const now = new Date().getTime();
  const updated = newDate(date).getTime();
  return timeDifference(now, updated);
}
