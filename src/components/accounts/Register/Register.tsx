//ユーザー登録のページ
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

// FormDataの型定義
interface FormData {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
}

const Register: React.FC = () => {
    // formDataの初期状態を設定し、useStateで管理します。
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
    });

    // useNavigateフックを使用してナビゲーション関数を取得します。


    // フォームの入力値が変更された時に呼び出されるハンドラー。
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // フォーム送信時に呼び出される非同期関数。
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // デストラクチャリングを使用してformDataから値を取得。
        const { username, email, firstName, lastName, password, passwordConfirm } = formData;
        console.log(formData);
        

        try {
            // axiosを使用してサーバーにPOSTリクエストを送信。
            const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
                username,
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                password_confirm: passwordConfirm
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // レスポンスメッセージをアラートで表示。
            alert(response.data.message);

        
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    // JSXを返してUIをレンダリング。
    return (
        /*
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
                <input type="password" name="passwordConfirm" placeholder="Confirm Password" onChange={handleChange} value={formData.passwordConfirm} required />
                <button type="submit">Register</button>
            </form>
        </div>
        */
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="fname"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Confirm Password"
                            type="password"
                            id="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Register;
