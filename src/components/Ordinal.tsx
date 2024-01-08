import React, { useState, useEffect } from 'react';
import { OrdinalTxo } from '../hooks/ordTypes';
import { ColorThemeProps, Theme } from '../theme';
import { Text } from './Reusable';
import { Show } from './Show';
import { ImageOverlay, HtmlWrapper, OrdText, FlexWrapper, FullScreenWrapper, FullScreenButton, FullScreenIframe } from './OrdinalStyles';
import { Helmet } from 'react-helmet';

export type OrdinalProps = {
  theme: Theme;
  url: string;
  isTransfer?: boolean;
  selected?: boolean;
  size?: string;
  inscription: OrdinalTxo;
  onClick?: () => void;
};

export const Ordinal = (props: OrdinalProps) => {
  const { url, selected, isTransfer, size, inscription, theme, onClick } = props;
  const contentType = inscription?.origin?.data?.insc?.file?.type;

  const [isContentRendered, setIsContentRendered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [iframeOrigin, setIframeOrigin] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndCheckMetaTag = async () => {
      try {
        // Fetch the HTML content
        const response = await fetch(url);
        const htmlContent = await response.text();

        // Check if the HTML content contains the specific meta tag
        const containsMetaTag = htmlContent.includes('<meta name="Mikastamp" content="Mikastamp">');

        // Set the state based on the presence of the meta tag
        setIsContentRendered(containsMetaTag);
      } catch (error) {
        console.error('Error fetching or checking meta tag:', error);
        setIsContentRendered(false);
      }
    };

    // Fetch and check the meta tag when the component mounts
    fetchAndCheckMetaTag();
  }, [url]);

  const handleDoubleClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount % 2 === 0) {
      props.onClick && props.onClick();
    } else {
      setIsExpanded(!isExpanded);
      setIframeOrigin(new URL(url).origin);
    }
  };

  const renderContent = () => {
    if (!isContentRendered) {
      return null; // Do not render content if the meta tag is not present
    }
    switch (true) {
      case contentType === 'text/html' || contentType === 'audio/mp3':
        return (
          <div style={{ position: 'relative', margin: '0.3rem' }}>
            <HtmlWrapper
              $isExpanded={isExpanded}
              $url={url}
              size={size}
              selected={selected}
              url={url}
              src={url}
              theme={theme}
              onClick={onClick}
              onDoubleClick={handleDoubleClick}
            >
              <OrdText $isExpanded={isExpanded} theme={theme}>
                {inscription.origin?.data?.insc?.text}
              </OrdText>
            </HtmlWrapper>
            <ImageOverlay
              $isExpanded={isExpanded}
              onClick={handleDoubleClick}
              $imageurl={url}
            />
            <FullScreenWrapper $isExpanded={isExpanded}>
              <FullScreenButton onClick={() => setIsExpanded(false)}>
                Go Back app
              </FullScreenButton>
              <FullScreenIframe src={url} frameBorder="0" />
            </FullScreenWrapper>
          </div>
        );

      case contentType?.startsWith('image/'):
        return (
          <div
            style={{
              height: size ?? '20rem',
              width: size ?? '20rem',
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '0.5rem',
              margin: '0.4rem',
              cursor: 'pointer',
              border: selected ? `0.8rem solid ${theme.lightAccent}` : undefined,
            }}
            onClick={onClick}
          />
        );
      case contentType === ('text/html'):
        return (
          <div
            style={{
              height: size ?? '20rem',
              width: size ?? '20rem',
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              border: selected ? `0.8rem solid ${theme.lightAccent}` : undefined,
            }}
            onClick={onClick}
          >
            <Text theme={theme}>{inscription.origin?.data?.insc?.text}</Text>
          </div>
        );
      case contentType === 'application/json':
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: size ?? '9rem',
              width: size ?? '9rem',
              borderRadius: '0.5rem',
              position: 'relative',
              backgroundColor: theme.darkAccent,
              margin: '0.5rem',
              cursor: 'pointer',
              border: selected ? `0.3rem solid ${theme.lightAccent}` : undefined,
              overflow: 'auto',
            }}
            onClick={onClick}
          >
            <pre
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                color: theme.primaryButton,
                margin: '0',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {JSON.stringify(inscription.origin?.data?.insc?.json, null, 2)}
            </pre>
          </div>
        );

      default:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflowX: 'auto',
              backgroundImage: `url(https://mikastamp.com/wp-content/uploads/2023/12/art-studio-mikastamp.jpg)`,
              backgroundSize: 'contain',
              borderRadius: '0.5rem',
              margin: '10px',
              cursor: 'pointer',
              border: selected ? `0.3rem solid ${theme.lightAccent}` : undefined,
            }}
            onClick={onClick}
          >
            <Text theme={theme}>Display content not possible</Text>
          </div>
        );
    }
  };

  return (
    <FlexWrapper>
      {renderContent()}
      <Show when={!isTransfer}>
        <Text
          theme={theme}
          style={{
            margin: '0.35rem 0',
            cursor: 'pointer',
            color: '#ffffff',
            background: '#111111',
            borderRadius: '8px',
          }}
        />
      </Show>
      {/* Conditional rendering of Helmet */}
      {isExpanded && (
        <Helmet>
          <script src="//code.tidio.co/8zmp9ucpfdjz1idqoe7w0l5qjnteh0lk.js" async />
        </Helmet>
      )}
    </FlexWrapper>
  );
};
