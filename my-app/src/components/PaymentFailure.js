import { Typography } from '@mui/material'
import { ContactCard } from 'pages/Submitted'
import React from 'react'

function PaymentFailure({ error }) {
    return (
        <>
            <Typography variant="h2">Error ⚠️</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Something went wrong when submitting your donation.
                <br></br>
                Error Message: <strong>"{error?.message} {error === null && "NULL"}"</strong>
                <br></br>
                <br></br>
            </Typography>

            <ContactCard />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <br></br><br></br>
                If you have any technical concerns, please contact:
                <br></br>

                <br></br>
                PJF I.T. & Developer
                <br></br>
                pjfitacc@gmail.com

            </Typography>

        </>
    )
}

export default PaymentFailure