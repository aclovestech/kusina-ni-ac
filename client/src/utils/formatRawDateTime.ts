export default function formatRawDateTime(rawDateTime: string) {
  const date = new Date(rawDateTime);
  const formattedDateTime = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  return formattedDateTime;
}
