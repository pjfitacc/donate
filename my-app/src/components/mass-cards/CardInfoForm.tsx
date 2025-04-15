import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { SitemarkIcon } from './CustomIcons';
import { AccountBalance, CreditCard } from '@mui/icons-material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function CardInfoForm() {
  const [recipientEmailError, setRecipientEmailError] = React.useState(false);
  const [recipientEmailErrorMessage, setRecipientEmailErrorMessage] = React.useState('');
  const [recipientNameError, setRecipientNameError] = React.useState(false);
  const [recipientNameErrorMessage, setRecipientNameErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (recipientEmailError || recipientNameError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      recipientEmail: data.get('recipientEmail'),
      recipientName: data.get('recipientName'),
    });
  };

  const validateInputs = () => {
    const recipientEmail = document.getElementById('recipientEmail') as HTMLInputElement;
    const recipientName = document.getElementById('recipientName') as HTMLInputElement;

    let isValid = true;

    if (!recipientEmail.value || !/\S+@\S+\.\S+/.test(recipientEmail.value)) {
      setRecipientEmailError(true);
      setRecipientEmailErrorMessage('Please enter a valid recipientEmail address.');
      isValid = false;
    } else {
      setRecipientEmailError(false);
      setRecipientEmailErrorMessage('');
    }

    if (!recipientName.value || recipientName.value.length < 6) {
      setRecipientNameError(true);
      setRecipientNameErrorMessage('Name must be at least 6 characters long.');
      isValid = false;
    } else {
      setRecipientNameError(false);
      setRecipientNameErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Mass Card Info
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="recipientEmail">Recipient Email</FormLabel>
          <TextField
            error={recipientEmailError}
            helperText={recipientEmailErrorMessage}
            id="recipientEmail"
            type="recipientEmail"
            name="recipientEmail"
            placeholder="recipient@email.com"
            autoComplete="recipientEmail"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={recipientEmailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="recipientName">Recipient Name</FormLabel>
          </Box>
          <TextField
            error={recipientNameError}
            helperText={recipientNameErrorMessage}
            name="recipientName"
            type="recipientName"
            id="recipientName"
            autoComplete="current-recipientName"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={recipientNameError ? 'error' : 'primary'}
          />
        </FormControl>
      </Box>
      <Divider></Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => console.log('Pay with Card')}
          startIcon={<CreditCard />}
        >
          Pay with Card
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => console.log('Pay with Debit / ACH')}
          startIcon={<AccountBalance />}
        >
          Pay with Debit / ACH
        </Button>
      </Box>
    </Card>
  );
}
