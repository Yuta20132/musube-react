import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext';
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
    Alert,
    IconButton
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { validateEmail } from '../../../utils/validation';


interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const { login } = useAuth();
    const { showNotification } = useNotification();
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const {email, password} = formData;
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        // 入力値検証
        if (!validateEmail(email)) {
            setError("正しいメールアドレスを入力してください。");
            setLoading(false);
            return;
        }
        
        if (password.length < 1) {
            setError("パスワードを入力してください。");
            setLoading(false);
            return;
        }
        
        try {
            await login(email.trim(), password);
            showNotification('ログインしました', 'success');
            navigate('/login-success');
        } catch (error) {
            // セキュリティのため詳細なエラー情報は表示しない
            setError("ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。");
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box 
            sx={{
                background: 'linear-gradient(135deg, #304FFE 0%, #64b5f6 100%)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                py: 8
            }}
        >
                <Container component="main" maxWidth="sm">
                    <Card elevation={2}>
                        <CardContent sx={{ p: 4 }}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ mb: 4 }}
                            >
                                <LoginIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                <Typography component="h1" variant="h4" sx={{ ml: 2, color: 'primary.main' }}>
                                    ログイン
                                </Typography>
                            </Box>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit} noValidate>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            inputProps={{ maxLength: 254 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon color="primary" />
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
                                            inputProps={{ maxLength: 128 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleTogglePasswordVisibility}
                                                            edge="end"
                                                            color="primary"
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
                                            size="large"
                                        >
                                            {loading ? 'ログイン中...' : 'ログイン'}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} textAlign="center"> 
                                        <Link
                                            component="button"
                                            variant="body2"
                                            onClick={handleForgotPassword}
                                            sx={{ color: 'primary.main' }}
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
