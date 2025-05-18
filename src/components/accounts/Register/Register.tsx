import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    TextField, 
    Button, 
    Grid, 
    Box, 
    Typography,
    Container,
    Card,
    CardContent,
    Alert,
    Stepper,
    Step,
    StepLabel,
    Paper,
    FormControl,
    InputAdornment,
    Select,
    MenuItem,
    SelectChangeEvent,
    IconButton
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// FormDataの型定義
interface FormData {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    memberType: number;
    institution: string,
}
const apiUrl = process.env.REACT_APP_API_URL;

const Register: React.FC = () => {
    // formDataの初期状態を設定し、useStateで管理します。
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
        institution: '',
        memberType: 1,
    });

    const [error, setError] = useState<string | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['基本情報', '個人情報', '認証情報'];
    const [showPasswords, setShowPasswords] = useState<boolean>(false);

    // フォームの入力値が変更された時に呼び出されるハンドラー。
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        setFormData({
            ...formData,
            [event.target.name as string]: event.target.value as number
        });
    };

    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    // バリデーション関数
    const validateStep = () => {
        switch(activeStep) {
            case 0:
                // 基本情報のバリデーション
                if (!formData.username || !formData.email) {
                    setError('すべての必須項目を入力してください');
                    return false;
                }
                break;
            case 1:
                // 個人情報のバリデーション
                if (!formData.firstName || !formData.lastName || !formData.institution) {
                    setError('すべての必須項目を入力してください');
                    return false;
                }
                break;
            case 2:
                // 認証情報のバリデーション
                if (!formData.password || !formData.passwordConfirm) {
                    setError('パスワードを入力してください');
                    return false;
                }
                if (formData.password !== formData.passwordConfirm) {
                    setError('パスワードが一致していません');
                    return false;
                }
                break;
            default:
                break;
        }
        setError(null);
        return true;
    };

    // フォーム送信時に呼び出される非同期関数。
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!validateStep()) return;

        // デストラクチャリングを使用してformDataから値を取得。
        const { username, email, firstName, lastName, password, passwordConfirm, memberType, institution } = formData;
        
        //パスワードと確認パスワードが一致しているかチェック
        if (password !== passwordConfirm) {
            setError('パスワードが一致していません');
            return;
        }

         // memberTypeが2（大学・研究所）の場合、メールアドレスのドメインがac.jpであるかをチェック
        if (memberType === 2) {
            const emailDomain = email.split('@')[1];
            if (emailDomain && !emailDomain.endsWith('ac.jp')) {
                setError('大学・研究所会員は大学または研究所のメールアドレス（ac.jpドメイン）を使用してください');
                return;
            }
        }
        try {
            // axiosを使用してサーバーにPOSTリクエストを送信。
            const response = await axios.post(`${apiUrl}/users/register/`, {
                name : username,
                email,
                first_name: firstName,
                last_name: lastName,
                institution,
                category_id:memberType,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //ページ遷移
            navigate('/send-mail')
        } catch (error) {
            console.error('登録エラー:', error);
            setError('登録中にエラーが発生しました。もう一度お試しください。');
        }
    };

    // パスワード表示/非表示を切り替える関数
    const togglePasswordVisibility = () => {
        setShowPasswords(!showPasswords);
    };

    return (
        <Box 
            sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
                minHeight: '100vh',
                py: 6
            }}
        >
                <Container component="main" maxWidth="md">
                    <Card 
                        elevation={10} 
                        sx={{ 
                            borderRadius: 4, 
                            overflow: 'hidden',
                            backdropFilter: 'blur(20px)',
                            bgcolor: 'rgba(255, 255, 255, 0.95)'
                        }}
                    >
                        <Box sx={{ 
                            bgcolor: 'primary.main', 
                            py: 2, 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <PersonAddAltIcon sx={{ color: 'white' }} />
                            <Typography component="h1" variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                                新規登録
                            </Typography>
                        </Box>

                        <CardContent sx={{ p: 4 }}>
                            {error && (
                                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                            )}

                            <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2, mb: 4 }}>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                    アカウントを作成して、アプリケーションの全機能にアクセスしましょう。
                                </Typography>
                            </Paper>

                            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <form onSubmit={handleSubmit} noValidate>
                                {activeStep === 0 && (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="username"
                                                label="ユーザー名"
                                                name="username"
                                                autoComplete="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
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
                                                id="email"
                                                label="メールアドレス"
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
                                    </Grid>
                                )}

                                {activeStep === 1 && (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="苗字"
                                                name="lastName"
                                                autoComplete="lname"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="名前"
                                                name="firstName"
                                                autoComplete="fname"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <Select
                                                    id="memberType"
                                                    name="memberType"
                                                    value={formData.memberType}
                                                    onChange={handleSelectChange}
                                                >
                                                    <MenuItem value={1}>一般会員</MenuItem>
                                                    <MenuItem value={2}>大学・研究所会員</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="institution"
                                                label="所属"
                                                name="institution"
                                                autoComplete="institution"
                                                value={formData.institution}
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SchoolIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                )}

                                {activeStep === 2 && (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="パスワード"
                                                type={showPasswords ? "text" : "password"}
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
                                                                aria-label="パスワードの表示切り替え"
                                                                onClick={togglePasswordVisibility}
                                                                edge="end"
                                                            >
                                                                {showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="passwordConfirm"
                                                label="確認パスワード"
                                                type={showPasswords ? "text" : "password"}
                                                id="passwordConfirm"
                                                value={formData.passwordConfirm}
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
                                                                aria-label="パスワードの表示切り替え"
                                                                onClick={togglePasswordVisibility}
                                                                edge="end"
                                                            >
                                                                {showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                )}

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        variant="outlined"
                                    >
                                        戻る
                                    </Button>
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            登録する
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleNext}
                                            variant="contained"
                                            color="primary"
                                        >
                                            次へ
                                        </Button>
                                    )}
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
        </Box>
    );
};

export default Register;

