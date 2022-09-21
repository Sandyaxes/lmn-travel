export const countDays = (firstDay, lastDay) => {
    const difference = Math.abs(firstDay.getTime() - lastDay.getTime());
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

    if (isNaN(TotalDays)) {
      return `days`;
    }

    return TotalDays === 1 ? `${TotalDays} day` : `${TotalDays} days`;

  };