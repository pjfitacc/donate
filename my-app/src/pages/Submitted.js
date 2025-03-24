import { Card, CardContent, Typography } from '@mui/material'
import PaymentSuccess from 'components/PaymentSuccess'
import React from 'react'
import PaymentFailure from 'components/PaymentFailure'
import "./submitted.css"

// The response will either be
// 1. an Error Object 
// 2. JSON of an APPROVED TransparentQuantumGateway DB Engine Response where the content of the response is in the key: quantumGatewayTransactionResponse and is an array
// ex: {quantumGatewayTransactionResponse: [Transaction Status, Auth Code, Transaction ID, AVS Response, CVV2 Response, Maxmind Score, Decline Reason, Decline Error Number]}
// see what the TransparentQGWDB Engine returns in more detailhttps://www.quantumgateway.com/view_developer.php?Cat1=3
// important note: 
// notice how response 2 (JSON) says "APPROVED". a valid response from QuantumGateway but in a declined state will return as an Error Object.
// If a response from QuantumGateway is declined, the message will be shown in the Error object's message key
function Submitted({ response }) {
    const content = () => {
        if (response instanceof Error || response === null) {
            return <PaymentFailure error={response} />
        }

        return <PaymentSuccess response={response} />
    }

    return (
        <div className="gradientBackground" style={{
            height: "100vh", width: "100%", display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card sx={{ margin: "auto", minheight: "50%", minWidth: "40%", alignContent: "center", alignItems: "center" }}>
                <CardContent>
                    {content()}
                </CardContent>
            </Card>
        </div>
    )
}


export const ContactCard = () => {
    return <CardContent>
        <Typography variant="h6">Contact</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            If you have any concerns regarding your donation, please contact:
            <br></br>

            <br></br>
            Ms. Fern L. Robles
            <br></br>
            Executive Director
            <br></br>
            pjf@phjesuits.org
            <br></br>
            Telephone number: (646) 370-1526
        </Typography>
    </CardContent>
}



export default Submitted