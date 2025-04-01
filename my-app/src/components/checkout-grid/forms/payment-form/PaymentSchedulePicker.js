import { CardGiftcard, Favorite, Repeat } from "@mui/icons-material";
import {
  CardActionArea,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import React from "react";
import useFormStore from "stores/formStore";

const Card = styled(MuiCard)(({ theme }) => ({
  border: "1px solid",
  // @ts-ignore
  borderColor: (theme.vars || theme).palette.divider,
  width: "100%",
  "&:hover": {
    background:
      "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
    borderColor: "primary.light",
    boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
    ...theme.applyStyles("dark", {
      background:
        "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
      borderColor: "primary.dark",
      boxShadow: "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
    }),
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      // @ts-ignore
      props: ({ selected }) => selected,
      style: {
        // @ts-ignore
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles("dark", {
          // @ts-ignore
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(250, 225, 159)",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "2.5px solid rgb(255, 136, 0)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgb(250, 225, 159)", // This sets the arrow color
  },
  [`& .${tooltipClasses.arrow}:before`]: {
    border: "2.5px solid rgb(255, 136, 0)", // Same as your tooltip border
  },
}));

function PaymentSchedulePicker({ isRecurring }) {
  const setField = useFormStore((state) => state.setField);

  const setRecurring = (value) => {
    setField("isRecurring", value);
  };

  // Inside your component:
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel htmlFor="">Donation Schedule</FormLabel>
      <RadioGroup
        aria-label="Payment options"
        name="paymentSchedule"
        value={isRecurring ? "recurring" : "oneTime"}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Card
          // @ts-ignore
          selected={!isRecurring}
        >
          <CardActionArea
            onClick={() => setRecurring(false)}
            sx={{
              ".MuiCardActionArea-focusHighlight": {
                backgroundColor: "transparent",
              },
              "&:focus-visible": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CardGiftcard
                fontSize="small"
                sx={[
                  (theme) => ({
                    color: "grey.400",
                    ...theme.applyStyles("dark", {
                      color: "grey.600",
                    }),
                  }),
                  !isRecurring && {
                    color: "primary.main",
                  },
                ]}
              />
              <Typography sx={{ fontWeight: "medium" }}>
                One Time Donation
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          // @ts-ignore
          selected={isRecurring}
        >
          <HtmlTooltip
            title={
              <React.Fragment>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Typography color="inherit">Highest Impact</Typography>
                  <Favorite fontSize="small" sx={{ color: "red" }} />
                </div>
              </React.Fragment>
            }
            arrow
            open={true}
            placement={isSmallScreen ? "bottom" : "top"}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 14],
                    },
                  },
                ],
              },
            }}
          >
            <CardActionArea
              onClick={() => setRecurring(true)}
              sx={{
                ".MuiCardActionArea-focusHighlight": {
                  backgroundColor: "transparent",
                },
                "&:focus-visible": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Repeat
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: "grey.400",
                      ...theme.applyStyles("dark", {
                        color: "grey.600",
                      }),
                    }),
                    isRecurring && {
                      color: "primary.main",
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: "medium" }}>
                  Recurring Donation
                </Typography>
              </CardContent>
            </CardActionArea>
          </HtmlTooltip>
        </Card>
      </RadioGroup>
    </FormControl>
  );
}

export default PaymentSchedulePicker;
