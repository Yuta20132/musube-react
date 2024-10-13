//ユーザー登録のページ
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Box,Grid, Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import ThreadsCreate from '../../board/ThreadsCreate';


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
            [event.target.name]: event.target.value as number
        });

        console.log('Updated formData:', formData);
    };

    const navigate = useNavigate();

    // フォーム送信時に呼び出される非同期関数。
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        

        // デストラクチャリングを使用してformDataから値を取得。
        const { username, email, firstName, lastName, password, passwordConfirm, memberType, institution } = formData;
        
        //パスワードと確認パスワードが一致しているかチェック
        if (password !== passwordConfirm) {
            alert('パスワードが一致していません');
            return;
        }

         // memberTypeが2（大学・研究所）の場合、メールアドレスのドメインがac.jpであるかをチェック
        if (memberType === 2) {
            const emailDomain = email.split('@')[1];
            if (emailDomain.endsWith('ac.jp')){
                alert('大学・研究所を選択した場合、メールアドレスのドメインは「ac.jp」でなければなりません。');
                return;
            }
        }
        try {
            // axiosを使用してサーバーにPOSTリクエストを送信。
            console.log(formData);
            const response = await axios.post('http://localhost:8080/users/register/', {
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

            // レスポンスメッセージを表示。
            console.log(response.data.message);

            //ページ遷移
            navigate('/send-mail')

        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 4, mb: 4, mx: 'auto', p: 2 }}           
            >
            <Typography component="h1" variant="h5">新規登録</Typography>
            </Box>
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
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
                        />
                    </Grid>

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
                        />
                    </Grid>
                    
                    
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="member-type-label">Member Type</InputLabel>
                            <Select
                                labelId="member-type-label"
                                id="memberType"
                                name="memberType"
                                value={formData.memberType}
                                label="所属カテゴリ"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={1}>一般</MenuItem>
                                <MenuItem value={2}>大学・研究所</MenuItem>
                                <MenuItem value={3}>企業</MenuItem>
                                <MenuItem value={4}>医者</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
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
                        />
                    </Grid>

                    
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="パスワード"
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
                            label="確認パスワード"
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
                            登録
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Register;
