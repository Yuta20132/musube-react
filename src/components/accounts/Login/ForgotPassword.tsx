import React, {useState} from 'react'
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';


const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //パスワードリセットの処理を実装
        //API側待ち
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
