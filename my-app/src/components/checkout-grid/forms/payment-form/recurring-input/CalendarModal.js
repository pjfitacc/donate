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

export default CalendarModal;
