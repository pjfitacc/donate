import { Card, CardContent } from "@mui/material";
import DonationInfo from "../DonationInfo";

export default function MobileDonationInputCard({ submittedDonation, donationErrors, ref }) {
    return (

        <Card
            sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100%',
                minHeight: 'max-content'
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

