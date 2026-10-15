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
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink } from 'react-router-dom';
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
            setError("メールアドレスの形式を確認してください。");
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
            navigate('/threads_page/1');
        } catch (error) {
            // セキュリティのため詳細なエラー情報は表示しない
            setError("ログインできませんでした。メールアドレスとパスワード、通信状況を確認して、もう一度お試しください。");
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box 
            sx={(theme) => ({
                background: theme.palette.background.default,
                minHeight: 'calc(100dvh - 72px)',
                display: 'flex',
                alignItems: 'center',
                py: { xs: 4, sm: 6 }
            })}
        >
                <Container maxWidth="sm">
                    <Card elevation={2}>
                        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
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
                                            label="メールアドレス"
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
                                            label="パスワード"
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
                                                            aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                                                            aria-pressed={showPassword}
                                                            onMouseDown={event => event.preventDefault()}
                                                            onClick={handleTogglePasswordVisibility}
                                                            edge="end"
                                                            color="primary"
                                                        >
                                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                                            {loading ? 'ログイン中…' : 'ログイン'}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} textAlign="center"> 
                                        <Link
                                            component={RouterLink}
                                            to="/forgot-password"
                                            variant="body2"
                                            sx={{ color: 'primary.main' }}
                                        >
                                            パスワードを忘れた方
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
                                初めてご利用の方は <Link component={RouterLink} to="/register_form">新規登録</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
        </Box>
    );
};

export default Login;
