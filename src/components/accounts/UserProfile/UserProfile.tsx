// UserProfile.tsx
import React from 'react';
import { Container, Typography, TextField, Grid } from '@mui/material';

interface UserProfileProps {
    username?: string;
    firstName?: string;
    lastName?: string;
    memberType?: string;
    email?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
    username = 'Default Username',
    firstName = 'Default First Name',
    lastName = 'Default Last Name',
    memberType = 'Default Member Type',
    email = 'default@example.com'
}) => {
    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">User Profile</Typography>
            <Grid container spacing={2}>
                {/* Each field with default value */}
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        value={username}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="First Name"
                        value={firstName}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Last Name"
                        value={lastName}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Member Type"
                        value={memberType}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        value={email}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfile;
