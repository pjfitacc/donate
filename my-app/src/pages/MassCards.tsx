import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import CardInfoForm from 'components/mass-cards/CardInfoForm';
import Content from 'components/mass-cards/Content';
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

export default function MassCards( props: { disableCustomTheme?: boolean, setPaymentType: React.Dispatch<React.SetStateAction<string>> }) {
  return (
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Box
              id="navigation-buttons"
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "row" },
                alignItems: "end",
                flexGrow: 1,
                gap: 1,
                pb: { xs: 12, sm: 0 },
                mt: { xs: 2, sm: 0 },
                mb: "60px",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<ChevronLeftRoundedIcon />}
                onClick={() => props.setPaymentType("")}
                variant="text"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Back to Payment Type Select
              </Button>
              </Box>
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <CardInfoForm />
            <Content />
          </Stack>
        </Stack>
        
      </Stack>
  );
}
