import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccountCircle,
  Business,
  BusinessCenter,
  Email,
  Info,
  LocalHospital,
  Person,
  Save,
  School,
} from '@mui/icons-material';
import axios from 'axios';
import { getCsrfToken } from '../../../utils/apiClient';
import { resolveUserCategoryId } from '../../../utils/categoryAccess';
import { validateEmail } from '../../../utils/validation';

const apiUrl = process.env.REACT_APP_API_URL;

const CATEGORY_OPTIONS = [
  { id: 1, label: '一般' },
  { id: 2, label: '大学・研究所' },
  { id: 3, label: '企業' },
  { id: 4, label: '医者' },
];

const ProfileCard = styled(Card)(() => ({
  position: 'relative',
  overflow: 'visible',
  marginTop: 40,
  marginBottom: 20,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    fontSize: '0.95rem',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
  },
}));

const MemberTypeChip = styled(Chip)(({ theme }) => ({
  height: 24,
  fontSize: '0.75rem',
  fontWeight: 600,
  borderRadius: 8,
  marginBottom: theme.spacing(2),
}));

const SaveButton = styled(Button)(({ theme }) => ({
  padding: '10px 30px',
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const GradientPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}10 100%)`,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

interface UserProfileProps {
  username: string;
  firstName: string;
  lastName: string;
  memberType: string;
  categoryId?: number;
  email: string;
  organization: string;
  description: string;
}

type UserUpdatePayload = Partial<{
  email: string;
  category_id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  institution: string;
  description: string;
}>;

const defaultUserProfile: UserProfileProps = {
  username: '',
  firstName: '',
  lastName: '',
  memberType: '',
  categoryId: undefined,
  email: '',
  organization: '',
  description: '',
};

const hasPayload = (payload: UserUpdatePayload): boolean => Object.keys(payload).length > 0;

const getMemberTypeColor = (memberType: string) => {
  switch (memberType) {
    case '一般':
      return { bg: '#e6f6f7', color: '#1f7f86' };
    case 'Academic':
    case '大学・研究所':
      return { bg: '#e8f5e9', color: '#087f23' };
    case 'Corporate':
    case '企業':
      return { bg: '#fff3e0', color: '#c60055' };
    case 'Medical':
    case '医者':
      return { bg: '#f3e5f5', color: '#ba000d' };
    default:
      return { bg: '#e6f6f7', color: '#1f7f86' };
  }
};

const getMemberTypeIcon = (memberType: string) => {
  switch (memberType) {
    case 'Academic':
    case '大学・研究所':
      return <School fontSize="small" />;
    case 'Corporate':
    case '企業':
      return <Business fontSize="small" />;
    case 'Medical':
    case '医者':
      return <LocalHospital fontSize="small" />;
    default:
      return <Person fontSize="small" />;
  }
};

const getMemberTypeLabel = (memberType: string) => {
  switch (memberType) {
    case '一般':
      return '一般';
    case 'Academic':
      return '大学・研究所';
    case 'Corporate':
      return '企業';
    case 'Medical':
      return '医者';
    default:
      return memberType;
  }
};

const getCategoryLabel = (categoryId?: number) => {
  const target = CATEGORY_OPTIONS.find((option) => option.id === categoryId);
  if (target) {
    return target.label;
  }
  if (categoryId === 5) {
    return '管理者';
  }
  return '';
};

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfileProps>(defaultUserProfile);
  const [initialProfile, setInitialProfile] = useState<UserProfileProps>(defaultUserProfile);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savingNonVerification, setSavingNonVerification] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [emailUpdateMessage, setEmailUpdateMessage] = useState<string | null>(null);
  const [categoryUpdateMessage, setCategoryUpdateMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (showSpinner = true) => {
    try {
      if (showSpinner) {
        setLoading(true);
      }

      const response = await axios.get(`${apiUrl}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const categoryId = resolveUserCategoryId(response.data as Record<string, unknown>) || undefined;
      const memberType = response.data.category || getCategoryLabel(categoryId);
      const nextProfile: UserProfileProps = {
        username: response.data.user_name || '',
        firstName: response.data.first_name || '',
        lastName: response.data.last_name || '',
        memberType,
        categoryId,
        email: response.data.email || '',
        organization: response.data.institution || '',
        description: response.data.description || '',
      };

      setUserProfile(nextProfile);
      setInitialProfile(nextProfile);
    } catch (error) {
      console.error('fetchData error:', error);
    } finally {
      if (showSpinner) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categoryOptions = useMemo(() => {
    const options = [...CATEGORY_OPTIONS];
    if (
      (userProfile.categoryId === 5 || initialProfile.categoryId === 5) &&
      !options.some((option) => option.id === 5)
    ) {
      options.push({ id: 5, label: '管理者' });
    }
    return options;
  }, [initialProfile.categoryId, userProfile.categoryId]);

  const sendUpdateRequest = async (payload: UserUpdatePayload) => {
    const csrfToken = getCsrfToken();
    await axios.put(`${apiUrl}/users`, payload, {
      headers: {
        'Content-Type': 'application/json',
        ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
      },
      withCredentials: true,
    });
  };

  const handleInputChange = (field: keyof UserProfileProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: event.target.value,
    }));
  };

  const handleTabChange = (_event: React.SyntheticEvent, tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const nextCategoryId = Number(event.target.value);
    if (!Number.isInteger(nextCategoryId)) {
      return;
    }
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      categoryId: nextCategoryId,
      memberType: getCategoryLabel(nextCategoryId),
    }));
  };

  const handleSaveNonVerificationChanges = async () => {
    setEmailUpdateMessage(null);
    setCategoryUpdateMessage(null);
    const payload: UserUpdatePayload = {};

    if (userProfile.username !== initialProfile.username) {
      payload.user_name = userProfile.username;
    }
    if (userProfile.firstName !== initialProfile.firstName) {
      payload.first_name = userProfile.firstName;
    }
    if (userProfile.lastName !== initialProfile.lastName) {
      payload.last_name = userProfile.lastName;
    }
    if (userProfile.organization !== initialProfile.organization) {
      payload.institution = userProfile.organization;
    }
    if (userProfile.description !== initialProfile.description) {
      payload.description = userProfile.description;
    }

    if (!hasPayload(payload)) {
      alert('更新内容がありません。');
      return;
    }

    try {
      setSavingNonVerification(true);
      await sendUpdateRequest(payload);
      await fetchData(false);
      alert('プロフィールを更新しました。');
    } catch (error) {
      console.error('handleSaveNonVerificationChanges error:', error);
      alert('プロフィールの更新に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSavingNonVerification(false);
    }
  };

  const handleSaveEmailChange = async () => {
    setEmailUpdateMessage(null);
    const nextEmail = userProfile.email.trim();
    if (!nextEmail) {
      alert('メールアドレスを入力してください。');
      return;
    }
    if (!validateEmail(nextEmail)) {
      alert('メールアドレスの形式が正しくありません。');
      return;
    }
    if (nextEmail === initialProfile.email) {
      alert('更新内容がありません。');
      return;
    }

    try {
      setSavingEmail(true);
      await sendUpdateRequest({ email: nextEmail });
      await fetchData(false);
      setEmailUpdateMessage('確認メールを送信しました。メールをご確認ください。');
    } catch (error) {
      console.error('handleSaveEmailChange error:', error);
      setEmailUpdateMessage(null);
      alert('メールアドレスの更新に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSavingEmail(false);
    }
  };

  const handleSaveCategoryChange = async () => {
    setCategoryUpdateMessage(null);
    if (typeof userProfile.categoryId !== 'number') {
      alert('会員種別を選択してください。');
      return;
    }
    if (userProfile.categoryId === initialProfile.categoryId) {
      alert('更新内容がありません。');
      return;
    }

    try {
      setSavingCategory(true);
      await sendUpdateRequest({ category_id: userProfile.categoryId });
      await fetchData(false);
      setCategoryUpdateMessage('確認メールを送信しました。メールをご確認ください。');
    } catch (error) {
      console.error('handleSaveCategoryChange error:', error);
      setCategoryUpdateMessage(null);
      alert('会員種別の更新に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSavingCategory(false);
    }
  };

  const memberTypeLabel = getMemberTypeLabel(userProfile.memberType || getCategoryLabel(userProfile.categoryId));
  const memberTypeStyle = getMemberTypeColor(memberTypeLabel);
  const fullName = `${userProfile.lastName} ${userProfile.firstName}`.trim();

  if (loading) {
    return (
      <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <GradientPaper elevation={0}>
        <Typography variant="h4" fontWeight="700" align="center" color="primary" gutterBottom>
          プロフィール
        </Typography>
      </GradientPaper>

      <Fade in timeout={800}>
        <ProfileCard>
          <Box sx={{ height: 40 }} />
          <CardContent sx={{ px: 4, pb: 4, pt: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                {fullName || 'ユーザー名'}
              </Typography>
              {(userProfile.memberType || userProfile.categoryId) && (
                <MemberTypeChip
                  icon={getMemberTypeIcon(memberTypeLabel)}
                  label={memberTypeLabel}
                  sx={{
                    backgroundColor: memberTypeStyle.bg,
                    color: memberTypeStyle.color,
                  }}
                />
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 2 }}>
              <Tab label="基本情報" />
              <Tab label="メールアドレス" />
              <Tab label="会員種別" />
            </Tabs>

            {activeTab === 0 && (
              <>
                <SectionTitle>基本情報の更新</SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <AccountCircle sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                      <StyledTextField
                        label="ユーザーネーム"
                        fullWidth
                        value={userProfile.username}
                        variant="outlined"
                        margin="dense"
                        onChange={handleInputChange('username')}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Person sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                      <StyledTextField
                        label="名字"
                        fullWidth
                        value={userProfile.lastName}
                        variant="outlined"
                        margin="dense"
                        onChange={handleInputChange('lastName')}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Person sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                      <StyledTextField
                        label="名前"
                        fullWidth
                        value={userProfile.firstName}
                        variant="outlined"
                        margin="dense"
                        onChange={handleInputChange('firstName')}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <BusinessCenter sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                      <StyledTextField
                        label="所属機関"
                        fullWidth
                        value={userProfile.organization}
                        variant="outlined"
                        margin="dense"
                        onChange={handleInputChange('organization')}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Info sx={{ color: 'primary.main', mr: 1, mt: 2 }} />
                      <StyledTextField
                        label="説明"
                        fullWidth
                        multiline
                        rows={4}
                        value={userProfile.description}
                        variant="outlined"
                        margin="dense"
                        onChange={handleInputChange('description')}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <SaveButton
                    variant="contained"
                    size="large"
                    onClick={handleSaveNonVerificationChanges}
                    startIcon={<Save />}
                    disabled={savingNonVerification}
                  >
                    {savingNonVerification ? '保存中...' : '保存'}
                  </SaveButton>
                </Box>
              </>
            )}

            {activeTab === 1 && (
              <>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  メールアドレスの変更はメール認証が必要です。
                </Alert>
                {emailUpdateMessage && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {emailUpdateMessage}
                  </Alert>
                )}
                <SectionTitle>メールアドレスの更新</SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Email sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                      <StyledTextField
                        label="メールアドレス"
                        fullWidth
                        value={userProfile.email}
                        variant="outlined"
                        margin="dense"
                        onChange={handleInputChange('email')}
                      />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Button variant="outlined" onClick={handleSaveEmailChange} disabled={savingEmail}>
                        {savingEmail ? '更新中...' : 'メールアドレスを更新'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}

            {activeTab === 2 && (
              <>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  会員種別の変更はメール認証が必要です。
                </Alert>
                {categoryUpdateMessage && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {categoryUpdateMessage}
                  </Alert>
                )}
                <SectionTitle>会員種別の更新</SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="dense">
                      <InputLabel id="category-select-label">会員種別</InputLabel>
                      <Select
                        labelId="category-select-label"
                        label="会員種別"
                        value={String(userProfile.categoryId ?? '')}
                        onChange={handleCategoryChange}
                      >
                        {categoryOptions.map((option) => (
                          <MenuItem key={option.id} value={String(option.id)}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box sx={{ mt: 1 }}>
                      <Button variant="outlined" onClick={handleSaveCategoryChange} disabled={savingCategory}>
                        {savingCategory ? '更新中...' : '会員種別を更新'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </ProfileCard>
      </Fade>
    </Container>
  );
};

export default UserProfile;
