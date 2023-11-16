import PropTypes from 'prop-types';
import { formatDistanceToNowStrict, isDate } from 'date-fns';
// material
import { createTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MUIRichTextEditor from 'mui-rte';
import { ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { ThemeProvider } from '@mui/styles';
// import "./ChatMessageItem.css";
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  // removes stupid margin from the rich text editor
  '& .public-DraftStyleDefault-block': {
    margin: 0
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary
}));

const MessageImgStyle = styled('img')(({ theme }) => ({
  height: 200,
  minWidth: 296,
  width: '100%',
  cursor: 'pointer',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius
}));

// ----------------------------------------------------------------------

ChatMessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  onOpenLightbox: PropTypes.func
};

/**
 *
 * @param {object} message
 * @param {object} message.senderId
 * @param {string} message.body
 * @param {string} message.contentType
 * @param {string} message.createdAt
 * @param {string} message.role
 * @param onOpenLightbox
 * @param other
 * @returns {JSX.Element}
 * @constructor
 */
export default function ChatMessageItem({ message, onOpenLightbox, ...other }) {
  // const sender = conversation.participants.find((participant) => participant.id === message.senderId);
  const sender = message.role;
  const senderDetails =
    sender === 'user'
      ? { type: 'me' }
      : {
          // avatar: sender.avatar,
          name: 'Tutor'
        };

  const isMe = senderDetails.type === 'me';
  const isImage = message.contentType === 'image';
  const firstName = senderDetails.name && senderDetails.name.split(' ')[0];

  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const timeout = setInterval(() => {
      setFormattedDate(
        formatDistanceToNowStrict(new Date(message.createdAt || new Date()), {
          addSuffix: true,
          roundingMethod: 'round'
        })
      );
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [message?.createdAt]);

  const [richText, setRichText] = useState('');

  useEffect(() => {
    if (message?.content) {
      const contentHTML = convertFromHTML(message.content);
      const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
      const content = JSON.stringify(convertToRaw(state));
      setRichText(content);
    }
  }, [message]);

  const defaultTheme = createTheme();

  Object.assign(defaultTheme, {
    overrides: {
      MUIRichTextEditor: {
        container: {
          margin: 0
        },
        editor: {
          margin: 0
        },
        editorContainer: {
          margin: 0
        }
      }
    }
  });

  return (
    <RootStyle {...other}>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto'
          })
        }}
      >
        <Box sx={{ ml: { xs: 0, md: 2 } }}>
          {senderDetails.type !== 'me' && (
            <Avatar
              alt={senderDetails.name}
              src={senderDetails.avatar}
              sx={{ width: 32, height: 32, display: { xs: 'none', md: undefined } }}
            />
          )}
          <InfoStyle noWrap variant="caption" sx={{ ...(isMe && { justifyContent: 'flex-end' }) }}>
            {!isMe && `${firstName},`}&nbsp;
            {formattedDate}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && {
                color: 'grey.800',
                bgcolor: 'primary.lighter',
                // maxWidth: "60vw",
                width: '100%'
              }),
              ...(!isMe && {
                maxWidth: '100%'
              })
            }}
          >
            {isImage ? (
              <MessageImgStyle alt="attachment" src={message.content} onClick={() => onOpenLightbox(message.content)} />
            ) : (
              <ThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor defaultValue={richText} readOnly={true} toolbar={false} style={{ margin: 0 }} />
              </ThemeProvider>
            )}
          </ContentStyle>
        </Box>
      </Box>
    </RootStyle>
  );
}
