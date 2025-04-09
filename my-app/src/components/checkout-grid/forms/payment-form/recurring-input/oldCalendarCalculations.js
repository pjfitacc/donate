import dayjs from "dayjs";

export function calculateRecurringDates(
  recipeID,
  timesToRecur,
  recurringRecipes
) {
  const settings = recurringRecipes[recipeID];
  if (!settings) throw new Error(`Invalid recipeID: ${recipeID}`);

  const { type, cycleDay } = settings;
  const recurringType = type.split(" ")[0].toLowerCase();
  const recurringDates = [];
  let currentDate = dayjs();
  const maxOccurrences = timesToRecur === 0 ? 10 : timesToRecur;

  // getFirstRecurringDate
  // The first recurring date to trigger between now and that date
  // is not necessarily the same length as the first reccuring date and all
  // other recurring dates.
  // implement that for all types
  // NOW, should be standardized so that anything below the current date in NOW's Date Object is truncated
  // reccuring dates should also be truncated during any comparison.

  while (recurringDates.length < maxOccurrences) {
    let nextDate = getNextRecurringDate(currentDate, recurringType, cycleDay);

    if (nextDate.isAfter(dayjs())) {
      recurringDates.push(nextDate.toDate());
    }
    currentDate = nextDate;
  }

  return recurringDates;
}

function getNextRecurringDate(date, type, cycleDay) {
  switch (type) {
    case "weekly":
      return getNextWeeklyDate(date, cycleDay);
    case "monthly":
      return getNextMonthlyDate(date, cycleDay);
    case "standard":
      return getNextQuarterlyDate(date, cycleDay);
    case "yearly":
      return date.add(1, "year").set("month", 0).set("date", cycleDay);
    default:
      throw new Error(`Unsupported recurring type: ${type}`);
  }
}

function getNextWeeklyDate(date, cycleDay) {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const targetDay = daysOfWeek.indexOf(cycleDay.toLowerCase());
  if (targetDay === -1) throw new Error(`Invalid weekly cycleDay: ${cycleDay}`);

  const daysUntilNext = (7 + targetDay - date.day()) % 7 || 7;
  return date.add(daysUntilNext, "day");
}

function getNextMonthlyDate(date, cycleDay) {
  let nextDate = date.add(1, "month").set("date", 1);
  nextDate = nextDate.set("date", Math.min(cycleDay, nextDate.daysInMonth()));
  return nextDate;
}

function getNextQuarterlyDate(date, cycleDay) {
  const quarters = [0, 3, 6, 9];
  const nextQuarter = quarters.find((q) => q > date.month()) ?? quarters[0];
  return date
    .add(nextQuarter === 0 ? 1 : 0, "year")
    .set("month", nextQuarter)
    .set("date", cycleDay);
}
