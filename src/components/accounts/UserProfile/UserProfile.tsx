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
        alert('プロフィールを更新しました');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>ユーザープロフィール</Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField label="ユーザーネーム" fullWidth value={username} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="名字" fullWidth value={lastName} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="名前" fullWidth value={firstName} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>所属</InputLabel>
                        <Select value={memberType} disabled={true} label="所属">
                            <MenuItem value="General">一般</MenuItem>
                            <MenuItem value="Academic">大学・研究所</MenuItem>
                            <MenuItem value="Corporate">企業</MenuItem>
                            <MenuItem value="Medical">医者</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="メールアドレス" fullWidth value={email} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                        保存
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfile;
