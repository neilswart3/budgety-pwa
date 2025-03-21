export const getFormattedDate = (
  date: Date | undefined,
  picks: string
): string | undefined => {
  if (!date) return undefined;

  const theDate = new Date(date);

  const t = {
    d: theDate.toLocaleDateString('en-ZA', { day: 'numeric' }),
    MMMM: theDate.toLocaleDateString('en-ZA', { month: 'long' }),
    MMM: theDate.toLocaleDateString('en-ZA', { month: 'short' }),
    y: theDate.getFullYear().toString(),
    t: theDate.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: 'numeric',
    }),
  };

  return picks
    .split(' ')
    .map((p) => t[p as keyof typeof t] || p)
    .join(' ');
};
