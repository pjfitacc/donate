import * as React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DonationInfo from '../DonationInfo';

export function MobileDonationInfoCard({ donation, setDonation, donationErrors }) {
    return (
        <Card sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }}>
            <CardContent
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Selected Donation
                    </Typography>
                    <Typography variant="body1">
                        {donation.amount} USD to {donation.beneficiary}
                    </Typography>
                </div>
                <DonationInfoMobile donation={donation} setDonation={setDonation} errors={donationErrors} />
            </CardContent>
        </Card>
    )
}

function DonationInfoMobile({ donation, setDonation, errors }) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
            <IconButton
                onClick={toggleDrawer(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <DonationInfo donation={donation} setDonation={setDonation} errors={errors} />
        </Box>
    );

    return (
        <div>
            <Button
                variant="text"
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={toggleDrawer(true)}
            >
                View details
            </Button>
            <Drawer
                open={open}
                anchor="top"
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        top: 'var(--template-frame-height, 0px)',
                        backgroundImage: 'none',
                        backgroundColor: 'background.paper',
                    },
                }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}