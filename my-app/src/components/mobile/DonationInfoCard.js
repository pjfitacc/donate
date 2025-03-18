import { Card, CardContent } from "@mui/material";
import DonationInfo from "../DonationInfo";

export default function DonationInfoCard({ submittedDonation, donationErrors, ref }) {
    return (

        <Card
            sx={{
                display: 'flex',
                flexDirection: "column",
                width: '100%',
                minHeight: 'max-content',
                maxWidth: 500,
                p: {md: 0},
                border: {md: 0}
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: 'max-content',
                    flexWrap: 'wrap',
                }}
            >
                <DonationInfo submittedDonation={submittedDonation} errors={donationErrors} ref={ref} />
            </CardContent>
        </Card>
    )

}

