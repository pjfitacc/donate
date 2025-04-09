/* 
Params:
- recipeID
    1. the time length between each recurring interval
    - ex: weekly
    2. the beginning cycle date and subsequent cycles.
    - ex: every Tuesday

- timesToRecur determines when we end the recurring interval
    - ex: how long the list of our recurring dates will be.

- recurringRecipes an object that contains:
    1. key: RecipeID in quantumgateway (number).
    2. value: RecipeSettings Object (the recipe settings associated with a RecipeID)
        {
            type: "" a string that indicates recurring frequency.
                - Recurring Frequency Options so far: Weekly, Monthly, Standard Quarterly, and Standard Yearly
                - note: the type string can have more words in it besides the frequency option, so make sure you strip only the first word from type
                - ex: Weekly (Nth Day)
            cycleDay: "" a string that indicates on which day the frequency falls to each time.
                - for Weekly, the possible cycleDay values are: Monday, Tuesday, Wednesday, ... Sunday
                - the other types get a cycleDay value of some number between 1 and 31 which are days in a month.
                - What if the transaction is processed on the 31st?
                    - If there are only 30 days in the month, then it will process on the 30th. The same thing applies for February. Either it will process on the 28th or 29th.
                - Monthly will be every cycleDay of the Month
                - Standard Quarterly is cycleDay of Jan, Apr, Jul, Oct
                - Standard Yearly is Every January cycleDay.
        }

Psuedocode:
Provided the recurring recipeID, we will reference the RecurringRecipeIDs object which is a hashmap
that maps a recipeID (number) to the recipe settings.
the important fields in this object to get are:
    - type
    - cycleDay 
Finally, starting the first reccuring date from and including today, get the list for all recurring days to be length timesToRecur.
if timesToRecur is 0, that means infinity, so just cap off the list to length 10.
do not include any cycles that are past today.

Returns: 
a list of date objects where recurring intervals should happen.
it does not include today's date that's tied to the initial amount that a customer pays upfront.
however, it could just so happen that the first recurring date will be today's date. if the first item in this list is today's date,
do not assume that it is the date associated with the initial amount.
- example:
    When a customer submits a recurring donation, they provide two things:
    1. a SEPARATE initial amount for today.
    2. a list of days where they will get billed based on the recurring settings
    The Customer submits a recurring payment today on Tuesday, and they set the recurring cycle to happen every Tuesday.
    The separate initial amount will fall on Today's Tuesday, but also:
    the return list would look like [Today's Tuesday, Next Tuesday, Week after next Tuesday, etc.]
    [Today's Tuesday...] in this list is associated with "2. a list of days where they will get billed based on the recurring settings"
    and not associated with "1. a SEPARATE initial amount for today." */

import dayjs from "dayjs";

export function calculateRecurringDates(
  recipeID,
  timesToRecur,
  recurringRecipes
) {
  const settings = recurringRecipes[recipeID];
  if (!settings) throw new Error(`Invalid recipeID: ${recipeID}`);

  const { type, cycleDay } = settings;
  const recurringType = type.split("(")[0].trim().toLowerCase();
  const recurringDates = [];
  const today = dayjs();
  let currentDate = today.startOf("day");
  const maxOccurrences = timesToRecur === 0 ? 10 : timesToRecur;

  if (type !== "weekly") {
    let firstRecurringDate = getFirstRecurringDate(
      currentDate,
      recurringType,
      cycleDay
    );
    recurringDates.push(firstRecurringDate.toDate());
    currentDate = firstRecurringDate;
  }

  while (
    recurringDates.length < maxOccurrences &&
    currentDate.year() < today.year() + 20
  ) {
    let nextDate = getNextRecurringDate(currentDate, recurringType, cycleDay);
    recurringDates.push(nextDate.toDate());
    currentDate = nextDate;
  }

  return recurringDates;
}

function getFirstRecurringDate(date, type, cycleDay) {
  switch (type) {
    case "weekly":
      return getNextWeeklyDate(date.subtract(1, "days"), cycleDay);
    case "monthly":
      return getNextMonthlyDate(date.subtract(1, "month"), cycleDay);
    case "standard quarterly":
      return getNextQuarterlyDate(date.subtract(3, "months"), cycleDay);
    case "standard yearly":
      const firstDayOftheYear = date.set("month", 0).set("date", cycleDay);
      return firstDayOftheYear.isSame(date)
        ? firstDayOftheYear
        : firstDayOftheYear.add(1, "year");
    default:
      throw new Error(`Unsupported recurring type: ${type}`);
  }
}

function getNextRecurringDate(date, type, cycleDay) {
  switch (type) {
    case "weekly":
      return getNextWeeklyDate(date, cycleDay);
    case "monthly":
      return getNextMonthlyDate(date, cycleDay);
    case "standard quarterly":
      return getNextQuarterlyDate(date, cycleDay);
    case "standard yearly":
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
