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
