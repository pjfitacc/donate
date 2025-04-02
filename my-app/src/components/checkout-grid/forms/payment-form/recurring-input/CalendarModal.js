import { Modal } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// Required Recurring Items to display:

// 1. RID (formStore field = recipeID)
// Sets the recurring frequency cycle
// IMPORTANT: the RID recipe will depend on the quantum gateway account that you use and what type of recurring frequency you mapped to a particular RID.
// ex: weekly, monthly, standard yearly. etc.

// 2. Recur times (formStore field = timesToRecur)
// Example: You charge $50.00 on first transaction and now want to charge them $50.00
// per month for a 11 months. Then the recur_times would be 11. After that, the recurring
// automatically stops for that entry

// 3. Recur Amount (formStore field = recurAmount)
//   example: The amount each point on the Recurring Cycle is

// 4. Initial Interval Amount (formStore field = initialIntervalAmount)
// The initial amount you pay TODAY on submit.
// If the initial amount date and the next recurring date with recur amount overlap, the initial amount takes precedence over recur amount.

// For further information on the Recurring Fields: https://www.quantumgateway.com/files/recurring_help.pdf

function CalendarModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      sx={style}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar"]}>
          <DateCalendar
            defaultValue={dayjs()}
            sx={{ backgroundColor: "white" }}
            readOnly
          />
        </DemoContainer>
      </LocalizationProvider>
    </Modal>
  );
}

function calculateRecurringDates(recipeID, timesToRecur) {
  // recipeID determines:
  // 1. the time length between each recurring interval
  // - ex: weekly
  // 2. the beginning cycle date and subsequent cycles.
  // - ex: every Tuesday
  //
  // timesToRecur determines when we end the recurring interval
  // - ex: how long the list of our recurring dates will be.
  //
  // returned: a list of date objects where a recurring interval should happen.
  // it does not include today's date that's tied to the initial amount that a customer pays upfront.
  // however, it could just so happen that the first recurring date will be today's date. if the first item in this list is today's date,
  // do not assume that it is the date associated with the initial amount.
  //
  // example:
  // When a customer submits a recurring donation, they provide two things:
  // 1. a SEPARATE initial amount for today.
  // 2. a list of days where they will get billed based on the recurring settings
  // The Customer submits a recurring payment today on Tuesday, and they set the recurring cycle to happen every Tuesday.
  // The separate initial amount will fall on Today's Tuesday, but also:
  // the return list would look like [Today's Tuesday, Next Tuesday, Week after next Tuesday, etc.]
  // [Today's Tuesday...] in this list is associated with "2. a list of days where they will get billed based on the recurring settings"
  // and not associated with "1. a SEPARATE initial amount for today."
}

export default CalendarModal;
