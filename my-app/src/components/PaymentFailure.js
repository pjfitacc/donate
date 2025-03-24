import { ContactCard } from 'pages/Submitted'
import React from 'react'

function PaymentFailure({ error }) {
    return (
        <>
            <div>Error: {error?.message} {error === null && "NULL"}</div>
            <br>
            </br>
            <div>Please contact pjfexecdir@gmail.com or pjfitacc@gmail.com for further help</div>
            <ContactCard />
        </>
    )
}

export default PaymentFailure