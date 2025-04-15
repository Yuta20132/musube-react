import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { 
    Box, 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Link, 
    Card, 
    CardContent, 
    InputAdornment, 
    Divider,
    Paper,
    Alert,
    IconButton
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
        setError(null);
        setLoading(true);
        
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
            
            // ログイン成功後にリダイレクトします。
            navigate('/login-success');
        } catch (error) {
            console.error(error);
            setError("ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。");
        } finally {
            setLoading(false);
        }
    };

    // パスワードの表示/非表示を切り替える関数
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box 
            sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                py: 8
            }}
        >
                <Container component="main" maxWidth="sm">
                    <Card 
                        elevation={10} 
                        sx={{ 
                            borderRadius: 4, 
                            overflow: 'hidden',
                            backdropFilter: 'blur(20px)',
                            bgcolor: 'rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ mb: 4 }}
                            >
                                <LoginIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                                <Typography component="h1" variant="h5" sx={{ ml: 2 }}>
                                    ログイン
                                </Typography>
                            </Box>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
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
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="current-password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleTogglePasswordVisibility}
                                                            edge="end"
                                                        >
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            startIcon={<LoginIcon />}
                                        >
                                            {loading ? 'ログイン中...' : 'ログイン'}
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
                        </CardContent>
                    </Card>
                </Container>
        </Box>
    );
};

export default Login;
