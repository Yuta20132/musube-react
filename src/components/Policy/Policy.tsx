import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Policy as PolicyIcon,
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
  Block as BlockIcon,
  Assignment as AssignmentIcon,
  PrivacyTip as PrivacyIcon,
  Visibility as VisibilityIcon,
  Shield as ShieldIcon,
  Copyright as CopyrightIcon,
  Gavel as GavelIcon,
  Update as UpdateIcon,
  Balance as BalanceIcon,
} from '@mui/icons-material';

const Policy = () => {
  const theme = useTheme();

  const policyItems = [
    {
      icon: <PolicyIcon />,
      title: 'ポリシーの目的',
      content: '本サイトは、ユーザー間の自由な意見交換や情報共有を促進するために設けられています。すべての利用者が安心して交流できる環境を維持するため、投稿内容や利用方法について一定のルールを設けています。',
    },
    {
      icon: <AccountIcon />,
      title: 'アカウントおよび利用条件',
      content: 'ユーザーは、本サイト利用にあたり、正確かつ最新の情報を登録してください。また、他者になりすます行為や不正な方法による利用は禁止されています。',
    },
    {
      icon: <BlockIcon />,
      title: '禁止事項',
      content: '以下の行為は禁止されています：',
      list: [
        '違法行為または犯罪行為に結びつく内容の投稿',
        '他者の名誉・プライバシーを侵害する投稿、誹謗中傷、ヘイトスピーチ',
        '過度に暴力的または不快な内容の投稿',
        'スパム行為、営利目的の無断広告・宣伝',
        '虚偽情報や誤解を招く情報の投稿',
      ],
    },
    {
      icon: <AssignmentIcon />,
      title: '投稿コンテンツの責任',
      content: 'ユーザーが投稿するコンテンツの内容は、原則として当該ユーザー自身の責任に帰します。なお、本サイトは投稿されたコンテンツの正確性や安全性について保証するものではなく、トラブルが生じた場合でも一切の責任を負いません。',
    },
    {
      icon: <PrivacyIcon />,
      title: 'プライバシーと個人情報の保護',
      content: '本サイトは、ユーザーのプライバシー保護に最大限の注意を払います。ユーザーから提供された個人情報は、本サイトのプライバシーポリシーに基づいて厳重に管理され、第三者に無断で提供することはありません。',
    },
    {
      icon: <VisibilityIcon />,
      title: 'コンテンツの監視と削除について',
      content: '本サイトは、利用者間のトラブル防止及び健全な運営のため、投稿内容を事前または事後に監視する権利を有します。不適切な投稿が認められた場合、当該投稿の削除や編集、または利用制限を行う場合があります。',
    },
    {
      icon: <ShieldIcon />,
      title: '免責事項',
      content: '本サイト上の情報やコンテンツの利用に起因する一切の損害について、本サイト運営者は責任を負いません。ユーザーは、自己の責任において本サイトを利用するものとし、万一問題が発生した場合は自己解決をお願いします。',
    },
    {
      icon: <CopyrightIcon />,
      title: '著作権および知的財産権',
      content: '本サイト内のすべてのコンテンツ、デザイン、ロゴその他の知的財産権は、本サイト運営者または正当な権利者に帰属します。利用者は、無断でこれらの情報を使用、複製、転載することを禁じます。',
    },
    {
      icon: <GavelIcon />,
      title: '利用制限および利用停止措置',
      content: '本規約に反する行為が認められた場合、運営者は当該利用者に対し、警告、投稿の削除、またはアクセスの一時停止や永久停止といった措置を講じる権利を有します。また、重大な違反があった場合には、法的措置をとる場合もあります。',
    },
    {
      icon: <UpdateIcon />,
      title: '規約の変更',
      content: '本規約は、運営上の必要に応じて変更されることがあります。変更後の規約は、本サイトに掲載された時点で効力を持ちます。ユーザーは、定期的に本規約を確認し、最新の内容に従うものとします。',
    },
    {
      icon: <BalanceIcon />,
      title: '準拠法および裁判管轄',
      content: '本規約は日本法に準拠し、これに従って解釈されます。また、本規約に関する紛争が発生した場合、運営者所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ヘッダーセクション */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <SecurityIcon
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main,
              mr: 2,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            掲示板サイト利用規約とポリシー
          </Typography>
        </Box>
        
        <Alert
          severity="info"
          sx={{
            mb: 2,
            '& .MuiAlert-icon': {
              color: theme.palette.primary.main,
            },
          }}
        >
          この利用規約（以下「本規約」といいます）は、当掲示板サイト（以下「本サイト」といいます）のご利用に関する条件を定めるものです。
        </Alert>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.7,
          }}
        >
          ユーザーの皆様は、本サイトにアクセス・利用することにより、本規約に同意したものとみなされます。定期的に本規約を確認し、更新された内容についてもご承知おきください。
        </Typography>
      </Paper>

      {/* ポリシー項目 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {policyItems.map((item, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 3,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                elevation: 3,
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[3],
              },
            }}
          >
            <Box display="flex" alignItems="flex-start" mb={2}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '50%',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mr: 2,
                  mt: 0.5,
                }}
              >
                {item.icon}
              </Box>
              <Box flex={1}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Chip
                    label={`${index + 1}`}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 600,
                      mr: 1,
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                    mb: item.list ? 2 : 0,
                  }}
                >
                  {item.content}
                </Typography>

                {item.list && (
                  <List dense sx={{ mt: 1 }}>
                    {item.list.map((listItem, listIndex) => (
                      <ListItem key={listIndex} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: theme.palette.primary.main,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={listItem}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.95rem',
                              color: theme.palette.text.secondary,
                              lineHeight: 1.6,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* フッター */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mt: 4,
          textAlign: 'center',
          backgroundColor: alpha(theme.palette.grey[50], 0.5),
        }}
      >
        <Divider sx={{ mb: 2 }} />
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
          }}
        >
          以上
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.disabled,
            mt: 1,
            display: 'block',
          }}
        >
          最終更新日: {new Date().toLocaleDateString('ja-JP')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Policy;
