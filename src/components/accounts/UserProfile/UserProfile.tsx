import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
interface UserProfileProps {
    username?: string;
    firstName?: string;
    lastName?: string;
    memberType?: string;
    email?: string;
}

const UserProfile: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfileProps>({
        username: '',
        firstName: '',
        lastName: '',
        memberType: '',
        email: '',
    });
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                console.log(response.data);
                setUserProfile({
                    username: response.data.user_name,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    memberType: response.data.category,
                    email: response.data.email,
                });


            } catch (error) {
                console.error('fetchData error:', error);
            }
        };
        fetchData();
    }, []);

    console.log(userProfile);

    const handleSaveChanges = () => {
        alert('プロフィールを更新しました');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" style={{ marginTop: 20, marginBottom: 20 }}>ユーザープロフィール</Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField label="ユーザーネーム" fullWidth defaultValue =" " value={userProfile.username} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="名字" fullWidth defaultValue =" " value={userProfile.lastName} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="名前" fullWidth defaultValue =" " value={userProfile.firstName} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
                </Grid>
                
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>所属</InputLabel>
                        <Select defaultValue ="一般" value={userProfile.memberType} disabled={true} label="所属">
                            <MenuItem value="一般">一般</MenuItem>
                            <MenuItem value="Academic">大学・研究所</MenuItem>
                            <MenuItem value="Corporate">企業</MenuItem>
                            <MenuItem value="Medical">医者</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="メールアドレス" fullWidth defaultValue =" " value={userProfile.email} variant="outlined" margin="dense" InputProps={{ readOnly: true }} />
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
