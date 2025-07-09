import React, { useState, ChangeEvent, FormEvent } from "react";
import { 
    Box, 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    InputAdornment, 
    Alert,
    IconButton
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import LockResetIcon from '@mui/icons-material/LockReset';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface FormData {
    password: string;
    confirmPassword: string;
}

const ResetPassword: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        password: "",
        confirmPassword: ""
    });
    
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // メッセージをクリア
        setMessage(null);
    };
    
    const { password, confirmPassword } = formData;
    
    const validateForm = (): boolean => {
        if (!password || !confirmPassword) {
            setMessage({ type: 'error', text: 'すべてのフィールドを入力してください。' });
            return false;
        }
        
        if (password.length < 8) {
            setMessage({ type: 'error', text: 'パスワードは8文字以上で入力してください。' });
            return false;
        }
        
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'パスワードが一致しません。' });
            return false;
        }
        
        return true;
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        try {
            // TODO: ここでパスワード再設定のAPI呼び出しを行う
            // const response = await axios.post(`${apiUrl}/users/reset-password-confirm`, {
            //     password: password
            // });
            
            // 仮の成功処理
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機（デモ用）
            setMessage({ type: 'success', text: 'パスワードが正常に再設定されました。' });
            
            // 3秒後にログインページに遷移
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'パスワードの再設定に失敗しました。再度お試しください。' });
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                            <LockResetIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                            <Typography component="h1" variant="h5" sx={{ ml: 2 }}>
                                パスワード再設定
                            </Typography>
                        </Box>
                        
                        {message && (
                            <Alert severity={message.type} sx={{ mb: 2 }}>
                                {message.text}
                            </Alert>
                        )}
                        
                        <form onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="新しいパスワード"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"
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
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
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
                                        name="confirmPassword"
                                        label="パスワード確認"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        value={formData.confirmPassword}
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
                                                        onClick={handleToggleConfirmPasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                                        startIcon={<LockResetIcon />}
                                    >
                                        {loading ? 'パスワード再設定中...' : 'パスワードを再設定'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default ResetPassword;
