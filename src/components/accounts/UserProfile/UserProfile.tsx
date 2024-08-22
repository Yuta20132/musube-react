import React from 'react';
import { Container, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

interface UserProfileProps {
    username?: string;
    firstName?: string;
    lastName?: string;
    memberType?: string;
    email?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
    username = 'DefaultUsername',
    firstName = 'DefaultFirstName',
    lastName = 'DefaultLastName',
    memberType = 'General',
    email = 'default@example.com'
}) => {
    const handleSaveChanges = () => {
        alert('Profile updated with current data.');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>User Profile</Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField label="Username" fullWidth value={username} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="First Name" fullWidth value={firstName} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Last Name" fullWidth value={lastName} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>Member Type</InputLabel>
                        <Select value={memberType} disabled={true} label="Member Type">
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Academic">Academic</MenuItem>
                            <MenuItem value="Corporate">Corporate</MenuItem>
                            <MenuItem value="Medical">Medical</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Email" fullWidth value={email} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfile;
