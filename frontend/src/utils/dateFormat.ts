export const formatDateTimePretty = (value?: string | null) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";

  const weekday = new Intl.DateTimeFormat("he-IL", { weekday: "short" }).format(d);
  const date = new Intl.DateTimeFormat("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
  const time = new Intl.DateTimeFormat("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

  return `${weekday}, ${date} · ${time}`;
};
