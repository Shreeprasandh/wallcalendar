export interface Holiday {
  name: string;
  emoji: string;
}

// Key format: "month-day" (0-indexed month)
export const HOLIDAYS: Record<string, Holiday> = {
  "0-1": { name: "New Year's Day", emoji: "🎆" },
  "0-26": { name: "Republic Day", emoji: "🇮🇳" },
  "1-14": { name: "Valentine's Day", emoji: "❤️" },
  "2-8": { name: "International Women's Day", emoji: "👩" },
  "2-17": { name: "St. Patrick's Day", emoji: "🍀" },
  "3-22": { name: "Earth Day", emoji: "🌍" },
  "4-1": { name: "May Day / Workers' Day", emoji: "👷" },
  "4-11": { name: "Mother's Day", emoji: "🌸" }, // May has index 4
  "5-5": { name: "World Environment Day", emoji: "🌿" },
  "5-15": { name: "Father's Day", emoji: "👨‍👧" }, // June has index 5
  "5-21": { name: "International Yoga Day", emoji: "🧘" },
  "7-15": { name: "Independence Day", emoji: "🇮🇳" }, // August has index 7
  "8-5": { name: "Teachers' Day", emoji: "🍎" },
  "9-2": { name: "Gandhi Jayanti", emoji: "👓" }, // October has index 9
  "9-31": { name: "Halloween", emoji: "🎃" },
  "10-14": { name: "Children's Day", emoji: "🧒" },
  "11-25": { name: "Christmas Day", emoji: "🎁" },
  "11-31": { name: "New Year's Eve", emoji: "🥂" },
};

export function getHoliday(month: number, day: number): Holiday | null {
  return HOLIDAYS[`${month}-${day}`] ?? null;
}
