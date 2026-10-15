import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, Stack, Grid, Link } from '@mui/material';
import { ForumOutlined, PeopleOutline, ArrowForward, SearchOutlined } from '@mui/icons-material';

const features = [
  { icon: <ForumOutlined />, title: '掲示板で話す', description: '気になる話題を読んだり、質問やアイデアを投稿したり。共通の関心から会話を始められます。' },
  { icon: <SearchOutlined />, title: 'ユーザーを探す', description: 'ユーザー名でメンバーを検索できます。プロフィールでは、所属や自己紹介を確認できます。' },
  { icon: <PeopleOutline />, title: '分野を越えてつながる', description: '一般掲示板に加え、会員種別に応じた掲示板で情報を共有できます。' },
];

const TopPage: React.FC = () => (
  <Box>
    <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 9 }, pb: { xs: 5, md: 8 } }}>
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography color="primary" variant="overline" sx={{ fontWeight: 700, letterSpacing: 2 }}>musuBe COMMUNITY</Typography>
          <Typography component="h1" sx={{ fontSize: { xs: '2rem', sm: '2.7rem', md: '3.2rem' }, fontWeight: 800, lineHeight: 1.45, mt: 1, mb: 2 }}>
            話す。見つける。<br />会話から、つながりへ。
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, lineHeight: 1.9 }}>
            musuBeは、質問やアイデアを通じて人とつながる交流の場です。<br />気になる話題やメンバーを見つけて、会話を始めましょう。
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
            <Button component={RouterLink} to="/register_form" variant="contained" size="large" endIcon={<ArrowForward />}>新規登録</Button>
            <Button component={RouterLink} to="/login" variant="outlined" size="large">ログイン</Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>掲示板・ユーザー検索の利用にはログインが必要です。</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, bgcolor: '#eaf4f3', borderColor: '#cfe4e2', borderRadius: 3 }}>
            <Typography component="h2" variant="h5" sx={{ mb: 3 }}>musuBeの始め方</Typography>
            <Stack spacing={3}>
              {[
                ['登録情報を入力', 'メールアドレスとプロフィールを入力します。'],
                ['メールアドレスを確認', '確認メール内のリンクを開くと、登録が完了します。'],
                ['会話に参加', 'ログインして掲示板やメンバーを探しましょう。'],
              ].map(([title, description], index) => (
                <Stack direction="row" spacing={2} key={title}>
                  <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '50%', bgcolor: 'white', color: 'primary.main', display: 'grid', placeItems: 'center', fontWeight: 700 }}>{index + 1}</Box>
                  <Box><Typography fontWeight={700}>{title}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography></Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: { xs: 6, md: 9 } }}>
        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>ここでできること</Typography>
        <Grid container spacing={2.5}>
          {features.map(feature => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Paper elevation={0} sx={{ height: '100%', p: 3 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <Typography component="h3" variant="h6" sx={{ mb: 1 }}>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 3, textAlign: 'center' }}>
      <Link component={RouterLink} to="/policy" variant="body2">利用規約とポリシー</Link>
    </Box>
  </Box>
);
export default TopPage;
