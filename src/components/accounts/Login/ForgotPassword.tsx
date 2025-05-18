import React, {useState} from 'react'
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //パスワードリセットの処理
        console.log('Reset password for email:', email);
        try{
            //サーバー側ではクッキーからトークンを取得するため、
            const response = await axios.get(
                `${apiUrl}/users/reset-password`, 
                { 
                    withCredentials: true, // クッキーを送信するために必要
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            // 成功した場合のユーザーへのフィードバック
            alert('パスワードリセット用のメールを送信しました。メールをご確認ください。');
        }
        catch(error){
            //エラー時の処理
            console.error('Error resetting password:', error);
            alert('パスワードリセットメールの送信に失敗しました。ログインしていることを確認してください。');
        }    
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
    <Container component="main" maxWidth="xs">
        <Box
            display="flex"
            justifyContent="Center"
            alignItems="center"
            sx={{ mt: 4, mb: 4, mx: 'auto', p: 2 }}
            >

            <Typography component="h1" variant="h5">
                パスワードを忘れた場合
            </Typography>
        </Box>
        <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant='contained'
                    color="primary"
                >
                    リセットリンクを送信
                </Button>
            </Grid>
            </Grid>
        </form>

    </Container>
  )
}

export default ForgotPassword
