import { Button, CardContent, Stack, Typography } from '@mui/material'
import { TransQGWdbeApprovedResponseSequence } from 'constants/quantumGateway'
import { ContactCard } from 'pages/Submitted';
import React from 'react'
import useFormStore from 'stores/formStore';

function PaymentSuccess({ response }) {
    const qgwTransaction = response['quantumGatewayTransactionResponse']
    const submittedForm = useFormStore.getState();
    const transactionID = qgwTransaction[TransQGWdbeApprovedResponseSequence.TRANSACTION_ID]

    return (
        <Stack id="complete-donation" spacing={2} useFlexGap>
            <Typography variant="h1">🎁</Typography>
            <Typography variant="h5">Thank you for your donation, {submittedForm.firstName}!</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Your support for <strong>{submittedForm.beneficiary}</strong> will go a long way.
                <br></br>
                This donation's number is <strong>#{transactionID}</strong>.
                <br></br>
                The email <strong>{submittedForm.email}</strong> should get a receipt soon.
            </Typography>

            <Typography variant="h6">Support Us Again</Typography>
            Feel free to support us again by making this donation recurring.
            <Button
                variant="contained"
                sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
            >
                Set up my recurring donation
            </Button>

            <ContactCard />
        </Stack>
    )
}

export default PaymentSuccess