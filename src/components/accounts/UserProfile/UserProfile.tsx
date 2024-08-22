import React, { useState } from 'react';
import { Container, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

// UserProfileのプロパティをオプショナルにする
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
    const [profile, setProfile] = useState<UserProfileProps>({ username, firstName, lastName, memberType, email });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof profile;
        const value = event.target.value;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const name = event.target.name as keyof typeof profile;
        const value = event.target.value;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>User Profile</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="First Name"
                        fullWidth
                        value={firstName}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>Member Type</InputLabel>
                        <Select
                            value={memberType}
                            disabled={true}
                            label="Member Type"
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
                        fullWidth
                        value={email}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        margin="dense"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfile;
