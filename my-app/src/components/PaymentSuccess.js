import { Stack, Typography } from '@mui/material'
import { TransQGWdbeApprovedResponseSequence } from 'constants/quantumGateway'
import { ContactCard } from 'pages/Submitted';
import React from 'react'
import useFormStore from 'stores/formStore';

function PaymentSuccess({ response }) {
    const qgwTransaction = response['quantumGatewayTransactionResponse']
    const submittedForm = useFormStore.getState();
    const transactionID = qgwTransaction[TransQGWdbeApprovedResponseSequence.TRANSACTION_ID]
    const noPreference = submittedForm.beneficiary.includes("No preference")

    return (
        <Stack id="complete-donation" spacing={2} useFlexGap>
            <Typography variant="h1">🎁</Typography>
            <Typography variant="h5">Thank you for your {submittedForm.isRecurring ? "recurring ": ""}donation, {submittedForm.firstName}!</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Your support {!noPreference && <>for <strong>{submittedForm.beneficiary}</strong></>} will go a long way.
                <br></br>
                This donation's number is <strong>#{transactionID}</strong>.
                <br></br>
                The email <strong>{submittedForm.email}</strong> should get a receipt soon.
                <br></br>
                <br></br>

                {!submittedForm.isRecurring &&
                <>Please consider setting up a recurring donation plan with PJF on this same donation form for further support.</>}

            </Typography>


            <ContactCard />
        </Stack>
    )
}

export default PaymentSuccess