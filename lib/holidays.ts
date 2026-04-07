export interface Holiday {
  name: string;
  emoji: string;
}

// Key format: "month-day" (0-indexed month)
export const HOLIDAYS: Record<string, Holiday> = {
  "0-1": { name: "New Year's Day", emoji: "🎆" },
  "0-15": { name: "Martin Luther King Jr. Day", emoji: "✊" },
  "1-14": { name: "Valentine's Day", emoji: "❤️" },
  "2-17": { name: "St. Patrick's Day", emoji: "🍀" },
  "3-22": { name: "Earth Day", emoji: "🌍" },
  "4-12": { name: "Mother's Day", emoji: "🌸" },
  "5-19": { name: "Father's Day", emoji: "👨‍👧" },
  "5-21": { name: "Summer Solstice", emoji: "☀️" },
  "6-4": { name: "Independence Day", emoji: "🇺🇸" },
  "8-2": { name: "Labor Day", emoji: "🔨" },
  "9-31": { name: "Halloween", emoji: "🎃" },
  "10-11": { name: "Veterans Day", emoji: "🎖️" },
  "10-27": { name: "Thanksgiving", emoji: "🦃" },
  "11-21": { name: "Winter Solstice", emoji: "❄️" },
  "11-24": { name: "Christmas Eve", emoji: "🎄" },
  "11-25": { name: "Christmas Day", emoji: "🎁" },
  "11-31": { name: "New Year's Eve", emoji: "🥂" },
};

export function getHoliday(month: number, day: number): Holiday | null {
  return HOLIDAYS[`${month}-${day}`] ?? null;
}
