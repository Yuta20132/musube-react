import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Paper, 
  Avatar, 
  Divider,
  Card,
  CardContent,
  Chip,
  Fade,
  CircularProgress,
  useTheme,
  Tooltip,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  AccountCircle, 
  Email, 
  School, 
  Business, 
  LocalHospital, 
  Person, 
  Save,
  BusinessCenter,
  Info,
  Edit
} from '@mui/icons-material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Styled components using the theme
const ProfileCard = styled(Card)(() => ({
  position: 'relative',
  overflow: 'visible',
  marginTop: 40,
  marginBottom: 20,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));


const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    fontSize: '0.95rem',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
  }
}));

const MemberTypeChip = styled(Chip)(({ theme }) => ({
  height: 24,
  fontSize: '0.75rem',
  fontWeight: 600,
  borderRadius: 8,
  marginBottom: theme.spacing(2)
}));

const SaveButton = styled(Button)(({ theme }) => ({
  padding: '10px 30px',
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  }
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
  username?: string;
  firstName?: string;
  lastName?: string;
  memberType?: string;
  email?: string;
  organization?: string;
  description?: string;
}

const getMemberTypeColor = (memberType: string) => {
  switch (memberType) {
    case '一般': return { bg: '#e3f2fd', color: '#304FFE' };
    case 'Academic': return { bg: '#e8f5e9', color: '#087f23' };  
    case 'Corporate': return { bg: '#fff3e0', color: '#c60055' };
    case 'Medical': return { bg: '#f3e5f5', color: '#ba000d' };
    default: return { bg: '#e3f2fd', color: '#304FFE' };
  }
};

const getMemberTypeIcon = (memberType: string) => {
  switch (memberType) {
    case 'Academic': return <School fontSize="small" />;
    case 'Corporate': return <Business fontSize="small" />;
    case 'Medical': return <LocalHospital fontSize="small" />;
    default: return <Person fontSize="small" />;
  }
};

const getMemberTypeLabel = (memberType: string) => {
  switch (memberType) {
    case '一般': return '一般';
    case 'Academic': return '大学・研究所';
    case 'Corporate': return '企業';
    case 'Medical': return '医者';
    default: return memberType;
  }
};

const UserProfile: React.FC = () => {
  const theme = useTheme();
  const [userProfile, setUserProfile] = useState<UserProfileProps>({
    username: '',
    firstName: '',
    lastName: '',
    memberType: '',
    email: '',
    organization: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({
    organization: false,
    description: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setUserProfile({
          username: response.data.user_name,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          memberType: response.data.category,
          email: response.data.email,
          organization: response.data.organization || '',
          description: response.data.description || '',
        });
      } catch (error) {
        console.error('fetchData error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveChanges = () => {
    alert('プロフィールを更新しました');
    setEditing({
      organization: false,
      description: false
    });
  };

  const handleInputChange = (field: keyof UserProfileProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [field]: event.target.value
    });
  };

  const toggleEdit = (field: 'organization' | 'description') => () => {
    setEditing({
      ...editing,
      [field]: !editing[field]
    });
  };

  const memberTypeStyle = getMemberTypeColor(userProfile.memberType || '');
  const fullName = `${userProfile.lastName || ''} ${userProfile.firstName || ''}`.trim();
  const initials = fullName ? 
    `${userProfile.lastName?.charAt(0) || ''}${userProfile.firstName?.charAt(0) || ''}`.toUpperCase() : '?';

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <GradientPaper elevation={0}>
        <Typography variant="h4" fontWeight="700" align="center" color="primary" gutterBottom>
        プロフィール
        </Typography>
      </GradientPaper>
      
      <Fade in={!loading} timeout={800}>
        <ProfileCard>
          <Box sx={{ height: 40 }} />
          <CardContent sx={{ px: 4, pb: 4, pt: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                {fullName || 'ユーザー名'}
              </Typography>
              {userProfile.memberType && (
                <MemberTypeChip
                  icon={getMemberTypeIcon(userProfile.memberType)}
                  label={getMemberTypeLabel(userProfile.memberType)}
                  sx={{
                    backgroundColor: memberTypeStyle.bg,
                    color: memberTypeStyle.color,
                  }}
                />
              )}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <SectionTitle>基本情報</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                  <StyledTextField
                    label="ユーザーネーム"
                    fullWidth
                    value={userProfile.username || ''}
                    variant="outlined"
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Person sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                  <StyledTextField
                    label="名字"
                    fullWidth
                    value={userProfile.lastName || ''}
                    variant="outlined"
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Person sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                  <StyledTextField
                    label="名前"
                    fullWidth
                    value={userProfile.firstName || ''}
                    variant="outlined"
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Email sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                  <StyledTextField
                    label="メールアドレス"
                    fullWidth
                    value={userProfile.email || ''}
                    variant="outlined"
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            
          
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <BusinessCenter sx={{ color: 'primary.main', mr: 1, mb: 0.5 }} />
                  <StyledTextField
                    label="所属機関"
                    fullWidth
                    value={userProfile.organization || ''}
                    variant="outlined"
                    margin="dense"
                    onChange={handleInputChange('organization')}
                    InputProps={{ 
                      readOnly: !editing.organization,
                      endAdornment: (
                        <Tooltip title={editing.organization ? "編集中" : "編集する"}>
                          <IconButton 
                            edge="end" 
                            onClick={toggleEdit('organization')}
                            color={editing.organization ? "primary" : "default"}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
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
                    value={userProfile.description || ''}
                    variant="outlined"
                    margin="dense"
                    onChange={handleInputChange('description')}
                    InputProps={{ 
                      readOnly: !editing.description,
                      endAdornment: (
                        <Tooltip title={editing.description ? "編集中" : "編集する"}>
                          <IconButton 
                            edge="end" 
                            onClick={toggleEdit('description')}
                            color={editing.description ? "primary" : "default"}
                            sx={{ mt: 1 }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <SaveButton 
                variant="contained" 
                size="large"
                onClick={handleSaveChanges}
                startIcon={<Save />}
                disabled={!editing.organization && !editing.description}
              >
                保存
              </SaveButton>
            </Box>
          </CardContent>
        </ProfileCard>
      </Fade>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Container>
  );
};

export default UserProfile;