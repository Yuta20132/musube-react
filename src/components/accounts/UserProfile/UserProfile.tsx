// UserProfile.tsx
import React from 'react';
import { Container, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';



interface UserProfileProps {
    username?: string;
    firstName?: string;
    lastName?: string;
    memberType?: string;
    email?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
    username = '',
    firstName = '',
    lastName = '',
    memberType = '',
    email = ''
}) => {
    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">User Profile</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        value={username}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="First Name"
                        value={firstName}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Last Name"
                        value={lastName}
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="member-type-label">Member Type</InputLabel>
                        <Select
                            labelId="member-type-label"
                            id="memberType"
                            value={memberType}
                            label="Member Type"
                            readOnly
                        >
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Academic">Academic</MenuItem>
                            <MenuItem value="Corporate">Corporate</MenuItem>
                            <MenuItem value="Medical">Medical</MenuItem>
                        </Select>
                    </FormControl>
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