import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { PandaHead } from '../../components/PandaHead';
import { Text } from '../../components/Reusable';
import { useBottomMenu } from '../../hooks/useBottomMenu';
import { useTheme } from '../../hooks/useTheme';
import { ColorThemeProps } from '../../theme';
import { storage } from '../../utils/storage';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.h1<ColorThemeProps>`
  font-size: 2rem;
  color: ${({ theme }) => theme.white};
  font-family: poppins, Helvetica, sans-serif;
  font-weight: 600;
  margin: 0.25rem 0;
  text-align: center;
`;

const GithubIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  bottom: 1.5rem;
  cursor: pointer;
`;

const InstallButton = styled(Button) <ColorThemeProps>`
  margin-top: 1rem;
`;

export const Start = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showStart, setShowStart] = useState(false);
  const { hideMenu, showMenu } = useBottomMenu();
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null); // Define state for deferredPrompt

  useEffect(() => {
    hideMenu();

    return () => {
      showMenu();
    };
  }, [hideMenu, showMenu]);

  useEffect(() => {
    storage.get(['encryptedKeys', 'connectRequest'], (result) => {
      if (result?.connectRequest) {
        setShowStart(false);
        navigate('/connect');
        return;
      }

      if (result?.encryptedKeys) {
        setShowStart(false);
        navigate('/ord-wallet');
        return;
      }
      setShowStart(true);
    });
  }, [navigate]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      console.log('beforeinstallprompt event captured:', event);
      setDeferredPrompt(event);
      setShowStart(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);


  const handleInstallButtonClick = () => {
    if (deferredPrompt) {
      // Show your custom UI, if needed
      // For example, display a modal or change button text

      // Trigger the installation prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          // Optionally, you can track or perform additional actions
        } else {
          console.log('User dismissed the install prompt');
          // Optionally, you can handle the dismissal
        }
      });

      // Reset deferredPrompt to null
      setDeferredPrompt(null);
    }
  };


  return (
    <>
      {showStart ? (
        <Content>
          <PandaHead width="6rem" />
          <TitleText theme={theme} style={{ marginTop: '2rem' }}>Mikastamp</TitleText>
          <Text theme={theme} style={{ marginBottom: '2rem', fontWeight: 'bold' }}>
            A Gallery for your collection.
          </Text>
          <Button theme={theme} type="primary" label="Create New Gallery" onClick={() => navigate('/create-wallet')} />
          <Button theme={theme} type="secondary" label="Restore Collection" onClick={() => navigate('/restore-wallet')} />
          <InstallButton theme={theme} type="primary" label="Install App" onClick={handleInstallButtonClick} />
        </Content>
      ) : (
        <></>
      )}
    </>
  );
};
