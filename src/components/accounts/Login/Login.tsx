import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {Box,  Container, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";



//axiosのインスタンスを作成してインターセプターを追加
const axiosInstance = axios.create({
    baseURL:'',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

//リクエストのインターセプターでトークンを添付
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);





// formDataの型を定義します。これはユーザーがフォームに入力するデータの形を表します。
interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    // useStateを使用してフォームデータの状態を管理します。初期値はemailとpasswordの空文字列です。
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    // 入力フィールドが変更されたときに呼び出される関数です。入力された値をformData状態にセットします。
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const {email, password} = formData;
    axios.defaults.withCredentials = true; // クッキーを使用して認証情報を保持するために必要です。
    // フォームが送信されたときに呼び出される非同期関数です。APIへのPOSTリクエストを行います。
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
        try {
            // axiosを使用してログインAPIエンドポイントにPOSTリクエストを送信します。
            const response = await axios.post("http://localhost:8080/users/login/", {
                email: email,
                password: password
            }, 
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(response.data)
            // ログイン成功後にリダイレクトします。
            navigate('/login-success');
        } catch (error) {
            console.log(formData)
            console.error(error);
            alert("Login failed");
        }
    };

    // コンポーネントのUI部分です。フォーム入力フィールドと送信ボタンが含まれます。
    return (
        <Container component="main" maxWidth="xs">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 4, mb: 4, mx: 'auto', p: 2 }}           
            >
            <Typography component="h1" variant="h5">ログイン</Typography>
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
                            value={formData.email}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            ログイン
                        </Button>
                    </Grid>
                    <Grid item xs={12} textAlign="center"> 
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleForgotPassword}
                        >
                            パスワードを忘れた場合はこちら
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </Container>
    );
};

export default Login;
