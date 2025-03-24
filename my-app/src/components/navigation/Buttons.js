import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

function Buttons({ activeStep, steps, onNext, onBack, isSubmitting }) {
    return (
        <Box
            id="navigation-buttons"
            sx={[
                {
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                },
                activeStep !== 0
                    ? { justifyContent: "space-between" }
                    : { justifyContent: "flex-end" },
            ]}
        >
            {activeStep !== 0 && (
                <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={onBack}
                    variant="text"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                    disabled={isSubmitting}
                >
                    Previous
                </Button>
            )}
            {activeStep !== 0 && (
                <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={onBack}
                    variant="outlined"
                    fullWidth
                    sx={{ display: { xs: "flex", sm: "none" } }}
                    disabled={isSubmitting}
                >
                    Previous
                </Button>
            )}
            <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={onNext}
                sx={{
                    width: { xs: "100%", sm: "fit-content" },
                }}
                disabled={isSubmitting}
                loadingPosition="end"
                loadingIndicator={<CircularProgress
                    size={18}
                    sx={{
                        color: "yellow",
                    }}

                />}
                loading={isSubmitting}
            >
                {isSubmitting ? <Typography color="yellow">Submitting</Typography> : <>{activeStep === steps.length - 1 ? "Place donation" : "Next"}</>}

            </Button>
        </Box>
    )
}

export default Buttons