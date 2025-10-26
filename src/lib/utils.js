export function formatRelativeDate(isoString) {
  const dateObj = new Date(isoString);
  const now = new Date();

  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = diffMs / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  // Case 1: Less than 24 hours ago
  if (diffDays < 1) {
    if (diffHours >= 1) {
      const hours = Math.floor(diffHours);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const minutes = Math.floor(diffMinutes);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
  }

  // Case 2: Yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  ) {
    return "yesterday";
  }

  // Case 3: Older than yesterday → "5 July, 2025"
  return dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}