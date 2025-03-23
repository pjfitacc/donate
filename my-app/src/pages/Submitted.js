import PaymentSuccess from 'components/PaymentSuccess'
import React from 'react'

function Submitted({ transactionResponse }) {
    console.log('tresponse', transactionResponse)
    return (
        transactionResponse[0] === "APPROVED" ?
            <PaymentSuccess /> :
            <div>Error</div>
    )
}

export default Submitted