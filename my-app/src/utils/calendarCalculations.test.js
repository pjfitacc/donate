// calculateRecurringDates.test.js
import dayjs from "dayjs";
import { calculateRecurringDates } from "./calendarCalculations";

const RECURRING_RECIPES = {
  1: { type: "Weekly (Every nth)", cycleDay: "Wednesday" },
  2: { type: "Monthly", cycleDay: 2 },
  3: { type: "Standard Quarterly", cycleDay: 2 },
  4: { type: "Standard Yearly", cycleDay: 2 },
};

describe("calculateRecurringDates", () => {
  // Mock the current date to April 1, 2025 (Tuesday) for consistent testing
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 3, 2)); // April 1, 2025
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("Basic functionality", () => {
    it("should throw an error for invalid recipeID", () => {
      expect(() => calculateRecurringDates(999, 0, RECURRING_RECIPES)).toThrow(
        "Invalid recipeID: 999"
      );
    });

    it("should return an array", () => {
      const result = calculateRecurringDates(1, 0, RECURRING_RECIPES);
      expect(Array.isArray(result)).toBe(true);
    });

    it("should return max 10 items when timesToRecur is 0", () => {
      const result = calculateRecurringDates(1, 0, RECURRING_RECIPES);
      expect(result.length).toBe(10);
    });
  });

  describe("Weekly recurrence", () => {
    it("should return the next Wednesday as first date (April 2, 2025)", () => {
      const result = calculateRecurringDates(1, 0, RECURRING_RECIPES);
      const firstDate = dayjs(result[0]);

      expect(firstDate.month()).toBe(3); // April (0-indexed)
      expect(firstDate.date()).toBe(2);
      expect(firstDate.year()).toBe(2025);
      expect(firstDate.day()).toBe(3); // Wednesday
    });

    it("should return subsequent Wednesdays", () => {
      const result = calculateRecurringDates(1, 0, RECURRING_RECIPES);

      // Check all dates are Wednesdays
      result.forEach((date) => {
        expect(dayjs(date).day()).toBe(3); // Wednesday
      });

      // Check the dates are in correct order
      for (let i = 1; i < result.length; i++) {
        const prevDate = dayjs(result[i - 1]);
        const currentDate = dayjs(result[i]);
        expect(currentDate.diff(prevDate, "day")).toBe(7);
      }
    });
  });

  describe("Monthly recurrence", () => {
    it("should return April 2, 2025 as first date", () => {
      const result = calculateRecurringDates(2, 0, RECURRING_RECIPES);
      const firstDate = dayjs(result[0]);

      expect(firstDate.month()).toBe(3); // April
      expect(firstDate.date()).toBe(2);
      expect(firstDate.year()).toBe(2025);
    });

    it("should return the 2nd of each subsequent month", () => {
      const result = calculateRecurringDates(2, 0, RECURRING_RECIPES);
      const expectedMonths = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0]; // April to January
      const expectedYears = [
        2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2025, 2026,
      ];

      result.forEach((date, index) => {
        const d = dayjs(date);
        expect(d.date()).toBe(2);
        expect(d.month()).toBe(expectedMonths[index]);
        expect(d.year()).toBe(expectedYears[index]);
      });
    });
  });

  describe("Standard Quarterly recurrence", () => {
    it("should return April 2, 2025 as first date", () => {
      const result = calculateRecurringDates(3, 0, RECURRING_RECIPES);
      const firstDate = dayjs(result[0]);

      expect(firstDate.month()).toBe(3); // April
      expect(firstDate.date()).toBe(2);
      expect(firstDate.year()).toBe(2025);
    });

    it("should return the 2nd of each subsequent quarter", () => {
      const result = calculateRecurringDates(3, 0, RECURRING_RECIPES);
      const expectedMonths = [3, 6, 9, 0, 3, 6, 9, 0, 3, 6]; // April, July, October, January...
      const expectedYears = [
        2025, 2025, 2025, 2026, 2026, 2026, 2026, 2027, 2027, 2027,
      ];

      result.forEach((date, index) => {
        const d = dayjs(date);
        expect(d.date()).toBe(2);
        expect(d.month()).toBe(expectedMonths[index]);
        expect(d.year()).toBe(expectedYears[index]);
      });
    });
  });

  describe("Standard Yearly recurrence", () => {
    it("should return January 2, 2026 as first date", () => {
      const result = calculateRecurringDates(4, 0, RECURRING_RECIPES);
      const firstDate = dayjs(result[0]);

      expect(firstDate.month()).toBe(0); // January
      expect(firstDate.date()).toBe(2);
      expect(firstDate.year()).toBe(2026);
    });

    it("should return January 2 of each subsequent year", () => {
      const result = calculateRecurringDates(4, 0, RECURRING_RECIPES);

      result.forEach((date, index) => {
        const d = dayjs(date);
        expect(d.month()).toBe(0); // January
        expect(d.date()).toBe(2);
        expect(d.year()).toBe(2026 + index);
      });
    });
  });

  describe("Recurring Dates Limit", () => {
    it("cut off the recurring dates so that the last element should be 20 years from now, even if the recurring times should be more than that.", () => {
      const result = calculateRecurringDates(4, 80, RECURRING_RECIPES);
      const lastDate = dayjs(result[result.length - 1]);

      expect(lastDate.year()).toBe(2045); // Last date should be in 2045
    });
  });
});
