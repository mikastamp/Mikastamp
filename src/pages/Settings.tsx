import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { WhitelistedApp } from '../App';
import x from '../assets/x.svg';
import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { ForwardButton } from '../components/ForwardButton';
import { Input } from '../components/Input';
import { QrCode } from '../components/QrCode';
import { HeaderText, Text } from '../components/Reusable';
import { SettingsRow } from '../components/SettingsRow';
import { Show } from '../components/Show';
import { SpeedBump } from '../components/SpeedBump';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { useBottomMenu } from '../hooks/useBottomMenu';
import { useKeys } from '../hooks/useKeys';
import { useSnackbar } from '../hooks/useSnackbar';
import { useSocialProfile } from '../hooks/useSocialProfile';
import { useTheme } from '../hooks/useTheme';
import { useWalletLockState } from '../hooks/useWalletLockState';
import { useWeb3Context } from '../hooks/useWeb3Context';
import { ColorThemeProps, transferCreditTextStyle } from '../theme';
import { SNACKBAR_TIMEOUT } from '../utils/constants';
import { NetWork } from '../utils/network';
import { storage } from '../utils/storage';
import { useBsv } from '../hooks/useBsv';
import { FiCopy } from 'react-icons/fi';
import { copyToClipboard } from '../utils/clipboard'; // Create a utility function for copying to the clipboard

const BsvInfoContainer = styled.div<ColorThemeProps>`
  display: flex;
  flex-direction: column;  // Updated to column layout
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.darkAccent};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.25rem;
  width: 80%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(70%);
  overflow-y: auto;
  overflow-x: hidden;
`;

const HeaderWrapper = styled.div`
  position: absolute;
  top: 3rem;
`;

const ConnectedAppRow = styled.div<ColorThemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.darkAccent};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.25rem;
  width: 80%;
`;

const SettingsText = styled(Text) <ColorThemeProps>`
  color: ${({ theme }) => theme.white};
  margin: 0;
  font-weight: 600;
  text-align: left;
`;

const XIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const AppIcon = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
`;

const ImageAndDomain = styled.div`
  display: flex;
  align-items: center;
`;

const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25rem;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 1rem;
`;

const ExportKeysAsQrCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

const PageWrapper = styled.div<{ $marginTop: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.$marginTop};
  width: 100%;
`;

type SettingsPage =
  | 'main'
  | 'connected-apps'
  | 'social-profile'
  | 'export-keys-options'
  | 'transfer-credits'
  | 'export-keys-qr'
  | 'preferences';
type DecisionType = 'sign-out' | 'export-keys' | 'export-keys-qr-code';

export const Settings = () => {
  const [copied, setCopied] = useState(false);
  const copyButtonRef = useRef(null);
  const { theme } = useTheme();
  const { setSelected } = useBottomMenu();
  const { lockWallet } = useWalletLockState();
  const [showSpeedBump, setShowSpeedBump] = useState(false);
  const { addSnackbar } = useSnackbar();
  const {
    network,
    updateNetwork,
    isPasswordRequired,
    updatePasswordRequirement,
    updateNoApprovalLimit,
    noApprovalLimit,
  } = useWeb3Context();
  const [page, setPage] = useState<SettingsPage>('main');
  const [connectedApps, setConnectedApps] = useState<WhitelistedApp[]>([]);
  const [speedBumpMessage, setSpeedBumpMessage] = useState('');
  const [decisionType, setDecisionType] = useState<DecisionType | undefined>();
  const { retrieveKeys } = useKeys();
  const { socialProfile, storeSocialProfile } = useSocialProfile();
  const [exportKeysQrData, setExportKeysAsQrData] = useState('');
  const [shouldVisibleExportedKeys, setShouldVisibleExportedKeys] = useState(false);
  const { bsvBalance, bsvAddress } = useBsv();  // Retrieve bsvBalance and bsvAddress from the useBsv hook
  const [enteredSocialDisplayName, setEnteredSocialDisplayName] = useState(socialProfile.displayName);
  const [enteredSocialAvatar, setEnteredSocialAvatar] = useState(socialProfile?.avatar);

  const handleCopyClick = () => {
    if (bsvAddress) {
      copyToClipboard(bsvAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  useEffect(() => {
    const getWhitelist = (): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        storage.get(['whitelist'], async (result) => {
          try {
            const { whitelist } = result;
            setConnectedApps(whitelist ?? []);
            resolve(whitelist ?? []);
          } catch (error) {
            reject(error);
          }
        });
      });
    };

    getWhitelist();
  }, []);

  const handleRemoveDomain = (domain: string) => {
    const newList = connectedApps.filter((app) => app.domain !== domain);
    storage.set({ whitelist: newList });
    setConnectedApps(newList);
  };

  const handleSignOutIntent = () => {
    setDecisionType('sign-out');
    setSpeedBumpMessage('Make sure you have your seed phrase backed up!');
    setShowSpeedBump(true);
  };

  const handleExportKeysIntent = () => {
    setDecisionType('export-keys');
    setSpeedBumpMessage(
      'You are about to download your private keys. Make sure you are in a safe place and no one is watching.',
    );
    setShowSpeedBump(true);
  };

  const handleExportKeysAsQrCodeIntent = () => {
    setDecisionType('export-keys-qr-code');
    setSpeedBumpMessage(
      'You are about to make your private keys visible in QR code format. Make sure you are in a safe place and no one is watching.',
    );
    setShowSpeedBump(true);
  };

  const handleSocialProfileSave = () => {
    storeSocialProfile({
      displayName: enteredSocialDisplayName,
      avatar: enteredSocialAvatar,
    });
    setPage('main');
  };

  useEffect(() => {
    if (!socialProfile) return;
    setEnteredSocialDisplayName(socialProfile.displayName);
    setEnteredSocialAvatar(socialProfile.avatar);
  }, [socialProfile]);

  const exportKeys = async (password: string) => {
    const keys = await retrieveKeys(password);

    const keysToExport = {
      mnemonic: keys.mnemonic,
      payPk: keys.walletWif,
      payDerivationPath: keys.walletDerivationPath,
      ordPk: keys.ordWif,
      ordDerivationPath: keys.ordDerivationPath,
      identityPk: keys.identityWif,
      identityDerivationPath: keys.identityDerivationPath,
    };

    const jsonData = JSON.stringify(keysToExport, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'mikastamp_collection_keys.json');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(url);
  };

  const exportKeysAsQrCode = async (password: string) => {
    const keys = await retrieveKeys(password);

    const keysToExport = {
      mnemonic: keys.mnemonic,
      payPk: keys.walletWif,
      payDerivationPath: keys.walletDerivationPath,
      ordPk: keys.ordWif,
      ordDerivationPath: keys.ordDerivationPath,
    };

    const jsonData = JSON.stringify(keysToExport, null, 2);
    setExportKeysAsQrData(jsonData);

    setPage('export-keys-qr');
    setShouldVisibleExportedKeys(true);
    setTimeout(() => {
      setShouldVisibleExportedKeys(false);
    }, 10000);
  };

  const signOut = async () => {
    await storage.clear();
    setDecisionType(undefined);
    window.location.reload();
  };

  const handleCancel = () => {
    setShowSpeedBump(false);
  };

  useEffect(() => {
    setSelected('settings');
  }, [setSelected]);

  const handleNetworkChange = (e: any) => {
    const network = e.target.checked ? NetWork.Testnet : NetWork.Mainnet;
    updateNetwork(network);

    // The provider relies on appState in local storage to accurately return addresses. This is an easy way to handle making sure the state is always up to date.
    addSnackbar(`Switching to ${network}`, 'info');
    setTimeout(() => {
      window.location.reload();
    }, SNACKBAR_TIMEOUT - 500);
  };

  const handleSpeedBumpConfirm = (password?: string) => {
    if (decisionType === 'sign-out') {
      signOut();
    }

    if (decisionType === 'export-keys' && password) {
      exportKeys(password);
      setDecisionType(undefined);
      setShowSpeedBump(false);
    }
    if (decisionType === 'export-keys-qr-code' && password) {
      exportKeysAsQrCode(password);
      setDecisionType(undefined);
      setShowSpeedBump(false);
    }
  };

  const main = (
    <>

      <BsvInfoContainer theme={theme}>
        <SettingsText style={transferCreditTextStyle} theme={theme}>Transfer credit</SettingsText>
        <SettingsText theme={theme}>{bsvBalance.toLocaleString('BSV', { maximumFractionDigits: 0 })} Units</SettingsText>
        <div style={{ display: 'flex', alignItems: 'center', margin: '5px', backgroundColor: '#8b734c', borderRadius: '3px', padding: '5px' }}>
          <SettingsText theme={theme}>Credit Address: {bsvAddress}</SettingsText>
          {copied && <span style={{ marginLeft: '0.5rem', color: '#fff' }}>Copied!</span>}
          <button
            ref={copyButtonRef}
            onClick={() => handleCopyClick()}
            disabled={copied}
            style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
          >
            <FiCopy />
          </button>
        </div>
      </BsvInfoContainer>
      {/*  <SettingsRow
        name="Connected Apps"
        description="Manage the apps you are connected to"
        onClick={() => setPage('connected-apps')}
        jsxElement={<ForwardButton />}
      />*/}
      <SettingsRow
        name="Preferences"
        description="Manage your gallery preferences"
        onClick={() => setPage('preferences')}
        jsxElement={<ForwardButton />}
      />
      {/*  <SettingsRow
        name="Testnet Mode"
        description="Applies to balances and app connections"
        jsxElement={<ToggleSwitch theme={theme} on={network === NetWork.Testnet} onChange={handleNetworkChange} />}
  /> */}
      <SettingsRow
        name="Export Keys"
        description="Download keys or export as QR code"
        onClick={() => setPage('export-keys-options')}
        jsxElement={<ForwardButton />}
      />

      {/* <SettingsRow name="Lock Wallet" description="Immediately lock the wallet" onClick={lockWallet} /> */}
      <SettingsRow name="Sign Out" description="Sign out of my gallery completely" onClick={handleSignOutIntent} />
    </>
  );

  const connectedAppsPage = (
    <PageWrapper $marginTop={connectedApps.length === 0 ? '10rem' : '-1rem'}>
      <BackButton onClick={() => setPage('main')} />
      <Show when={connectedApps.length > 0} whenFalseContent={<Text theme={theme}>No apps connected</Text>}>
        <ScrollableContainer>
          {connectedApps.map((app, idx) => {
            return (
              <ConnectedAppRow key={app.domain + idx} theme={theme}>
                <ImageAndDomain>
                  <AppIcon src={app.icon} />
                  <SettingsText theme={theme}>{app.domain}</SettingsText>
                </ImageAndDomain>
                <XIcon src={x} onClick={() => handleRemoveDomain(app.domain)} />
              </ConnectedAppRow>
            );
          })}
        </ScrollableContainer>
      </Show>
    </PageWrapper>
  );

  const exportKeysAsQrCodePage = (
    <>
      <BackButton onClick={() => setPage('main')} />
      <Show when={shouldVisibleExportedKeys} whenFalseContent={<Text theme={theme}>Timed out. Please try again</Text>}>
        <ExportKeysAsQrCodeContainer>
          <QrCode address={exportKeysQrData} />
        </ExportKeysAsQrCodeContainer>
      </Show>
    </>
  );

  const exportKeyOptionsPage = (
    <>
      <BackButton onClick={() => setPage('main')} />
      <SettingsRow
        name="Download Keys"
        description="Download your seed, private, and public keys"
        onClick={handleExportKeysIntent}
      />
      <SettingsRow
        name="Export Keys as QR code"
        description="Display private keys as QR code for mobile import"
        onClick={handleExportKeysAsQrCodeIntent}
      />
    </>
  );

  const preferencesPage = (
    <>
      <BackButton onClick={() => setPage('main')} />
      {/* <SettingsRow
        name="Social Profile"
        description="Set your display name and avatar"
        onClick={() => setPage('social-profile')}
        jsxElement={<ForwardButton />}
  /> */}
      <SettingsRow
        name="Require Password"
        description="Require a password for sending assets?"
        jsxElement={
          <ToggleSwitch
            theme={theme}
            on={isPasswordRequired}
            onChange={() => updatePasswordRequirement(!isPasswordRequired)}
          />
        }
      />
      {/*
      <SettingsRow
        name="Auto Approve Limit"
        description="Transactions at or below this BSV amount will be auto approved."
        jsxElement={
          <Input
            theme={theme}
            placeholder={String(noApprovalLimit)}
            type="number"
            onChange={(e) => updateNoApprovalLimit(Number(e.target.value))}
            value={noApprovalLimit}
            style={{ width: '5rem', margin: 0 }}
          />
        }
      /> */}
    </>
  );

  const socialProfilePage = (
    <PageWrapper $marginTop="5rem">
      <BackButton onClick={() => setPage('preferences')} />
      <SettingsText theme={theme}>Display Name</SettingsText>
      <Input
        theme={theme}
        placeholder="Display Name"
        type="text"
        onChange={(e) => setEnteredSocialDisplayName(e.target.value)}
        value={enteredSocialDisplayName}
      />
      <SettingsText theme={theme}>Avatar</SettingsText>
      <Input
        theme={theme}
        placeholder="Avatar Url"
        type="text"
        onChange={(e) => setEnteredSocialAvatar(e.target.value)}
        value={enteredSocialAvatar}
      />
      <Button
        theme={theme}
        type="primary"
        label="Save"
        style={{ marginTop: '1rem' }}
        onClick={handleSocialProfileSave}
      />
    </PageWrapper>
  );

  return (
    <Show
      when={!showSpeedBump}
      whenFalseContent={
        <SpeedBump
          theme={theme}
          message={speedBumpMessage}
          onCancel={handleCancel}
          onConfirm={(password?: string) => handleSpeedBumpConfirm(password)}
          showSpeedBump={showSpeedBump}
          withPassword={decisionType === 'export-keys' || decisionType === 'export-keys-qr-code'}
        />
      }
    >
      <Content>
        <HeaderWrapper>
          <HeaderText style={{ fontSize: '1.25rem' }} theme={theme}>
            {page === 'connected-apps'
              ? 'Connected Apps'
              : page === 'social-profile'
                ? 'Social Profile'
                : page === 'preferences'
                  ? 'Preferences'
                  : page === 'export-keys-options'
                    ? 'Export Keys'
                    : page === 'export-keys-qr'
                      ? 'Exported QR code'
                      : 'Settings'}
          </HeaderText>
        </HeaderWrapper>
        <Show when={page === 'main'}>{main}</Show>
        <Show when={page === 'connected-apps'}>{connectedAppsPage}</Show>
        <Show when={page === 'preferences'}>{preferencesPage}</Show>
        {/* <Show when={page === 'social-profile'}>{socialProfilePage}</Show> */}
        <Show when={page === 'export-keys-options'}>{exportKeyOptionsPage}</Show>
        <Show when={page === 'export-keys-qr'}>{exportKeysAsQrCodePage}</Show>
      </Content>
    </Show>
  );
};
