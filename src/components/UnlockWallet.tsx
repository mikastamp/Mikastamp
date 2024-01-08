import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useKeys } from '../hooks/useKeys';
import { useTheme } from '../hooks/useTheme';
import { useViewport } from '../hooks/useViewport';
import { ColorThemeProps } from '../theme';
import { sleep } from '../utils/sleep';
import { storage } from '../utils/storage';
import { Button } from './Button';
import { Input } from './Input';
import { PandaHead } from './PandaHead';
import { FormContainer, HeaderText } from './Reusable';

const Container = styled.div<ColorThemeProps & { $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${(props) => (props.$isMobile ? '100vw' : '22.5rem')};
  height: ${(props) => (props.$isMobile ? '100vh' : '33.75rem')};
  background-color: ${({ theme }) => theme.darkAccent};
  color: ${({ theme }) => theme.white};
  z-index: 100;
  border-radius: 10px;
`;

export type UnlockWalletProps = {
  onUnlock: () => void;
};

export const UnlockWallet = (props: UnlockWalletProps) => {
  const { onUnlock } = props;
  const { theme } = useTheme();
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const { isMobile } = useViewport();

  const { verifyPassword } = useKeys();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleUnlock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      const isVerified = await verifyPassword(password);
      if (isVerified) {
        setVerificationFailed(false);
        const timestamp = Date.now();
        storage.set({ lastActiveTime: timestamp });
        onUnlock();
      } else {
        setVerificationFailed(true);
        setPassword('');
        setIsProcessing(false);
      }
    }, 25);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    // Clear the timeout on component unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <Container $isMobile={isMobile} theme={theme}>
      <PandaHead width="6rem" />
      <HeaderText theme={theme} style={{ marginTop: '2rem', fontSize: '1.5rem' }}>Unlock Gallery</HeaderText>
      <FormContainer onSubmit={handleUnlock}>
        <Input
          theme={theme}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '2rem' }}
          shake={verificationFailed ? 'true' : 'false'}
        />
        <Button
          theme={theme}
          type="primary"
          label={isProcessing ? 'Unlocking...' : 'Unlock'}
          disabled={isProcessing}
          isSubmit
        />
      </FormContainer>
    </Container>
  );
};
