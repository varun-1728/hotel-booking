export const getMemberSinceText = (registerDate) => {
  const now = new Date();
  const registered = new Date(registerDate);
  const diffInMs = now.getTime() - registered.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.44);

  if (diffInYears >= 1) {
    const years = Math.floor(diffInYears);
    return `${years} years on Airbnb`;
  } else if (diffInMonths >= 1) {
    const months = Math.floor(diffInMonths);
    return `${months} months on Airbnb`;
  } else {
    return "registered less than a month ago";
  }
};
