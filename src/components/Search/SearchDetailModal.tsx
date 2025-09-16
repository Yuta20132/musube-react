import React from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
  Stack,
  Divider,
  Tooltip,
  Grid,
  Skeleton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { SearchResult } from './SearchTypes';

interface SearchDetailModalProps {
  open: boolean;
  content: SearchResult | null;
  onClose: () => void;
}

const SearchDetailModal: React.FC<SearchDetailModalProps> = ({ open, content, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const getInstitutionIcon = (type: string) => {
    switch (type) {
      case '大学・研究所':
        return <SchoolIcon color="primary" />;
      case '企業':
        return <BusinessIcon color="primary" />;
      case '医者':
        return <LocalHospitalIcon color="primary" />;
      case '一般':
      default:
        return <PersonIcon color="primary" />;
    }
  };

  const getInitials = (lastName?: string, firstName?: string) => {
    const l = lastName?.[0] ?? '';
    const f = firstName?.[0] ?? '';
    return `${l}${f}`;
  };

  const handleCopyEmail = async (email?: string) => {
    if (!email) return;
    try {
      await navigator.clipboard?.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      // クリップボード未対応環境は無視
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(100, 116, 139, 0.5)', // テーマのgrey.500を使用
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '92%', sm: 600 },
          maxWidth: '92%',
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 2,
          p: 4,
          outline: 'none',
          overflowY: 'auto',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'primary.main',
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* コンテンツ */}
        {content ? (
          <Box sx={{ mt: 2 }}>
            {/* ヘッダー */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', width: 56, height: 56 }}>
                {getInitials(content.lastName, content.firstName)}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {content.lastName} {content.firstName}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                  <AlternateEmailIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">@{content.userName}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={content.institutionType}
                    icon={getInstitutionIcon(content.institutionType)}
                  />
                </Stack>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* 詳細 */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon color="primary" sx={{ fontSize: 20 }} />
                  <Typography variant="body1">{content.email}</Typography>
                  <Tooltip title={copied ? 'コピーしました' : 'コピー'}>
                    <IconButton size="small" onClick={() => handleCopyEmail(content.email)} aria-label="メールをコピー">
                      <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {getInstitutionIcon(content.institutionType)}
                  <Typography variant="body1">{content.institution}</Typography>
                </Stack>
              </Grid>
            </Grid>

            {/* アクション */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button variant="outlined" onClick={onClose}>閉じる</Button>
              <Button variant="contained" color="primary" onClick={() => alert('プロフィールへ移動')}>
                プロフィールを見る
              </Button>
            </Stack>
          </Box>
        ) : (
          // フォールバック（contentが無い場合のスケルトン）
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={56} height={56} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width={220} height={32} />
                <Skeleton variant="text" width={140} />
              </Box>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width={240} height={28} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="text" width={240} height={28} />
              </Grid>
            </Grid>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="flex-end" sx={{ mt: 4 }}>
              <Skeleton variant="rectangular" width={100} height={36} />
              <Skeleton variant="rectangular" width={160} height={36} />
              <Skeleton variant="rectangular" width={120} height={36} />
            </Stack>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SearchDetailModal;
