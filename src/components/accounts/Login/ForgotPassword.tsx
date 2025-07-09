import React, { useState } from 'react'
import { Container, Box, Typography, TextField, Button, Grid, Alert } from '@mui/material'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)
    try {
      // パスワードリセットリンクのリクエスト
      const response = await axios.post(
        `${apiUrl}/users/reset-password`,
        { email: email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      setMessage({ type: 'success', text: 'リセットリンクを送信しました。メールをご確認ください。' })
    } catch (error: any) {
      console.error(error)
      setMessage({ type: 'error', text: error.response?.data?.message || '送信に失敗しました。再度お試しください。' })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mt: 4, mb: 4, p: 2 }}
      >
        <Typography component="h1" variant="h5">
          パスワードを忘れた場合
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mt: 2, width: '100%' }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
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
              <Button type="submit" fullWidth variant="contained" color="primary">
                リセットリンクを送信
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default ForgotPassword
