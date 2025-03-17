import { Card, CardContent } from "@mui/material";
import DonationInfo from "../DonationInfo";

export default function MobileDonationCard ({donation, setDonation, donationErrors}) {
    return (
        <Card 
        sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            width: '100%', 
            minHeight: '42%',
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
            <DonationInfo donation={donation} setDonation={setDonation} errors={donationErrors}/>
            </CardContent>
        </Card>
    )
    
}