export const WOC_BASE_URL = 'https://api.whatsonchain.com/v1/bsv/main';

export const WOC_TESTNET_BASE_URL = 'https://api.whatsonchain.com/v1/bsv/test';

export const GP_BASE_URL = 'https://ordinals.gorillapool.io';

export const GP_TESTNET_BASE_URL = 'https://testnet.ordinals.gorillapool.io';
export const GORILLA_POOL_ARC_URL = 'https://arc.gorillapool.io/v1';
export const BSV_DECIMAL_CONVERSION = 100000000;
export const BSV20_INDEX_FEE = 1000;
export const FEE_PER_BYTE = 0.1;
export const MAX_BYTES_PER_TX = 50000000; // 50MB
export const MAX_FEE_PER_TX = MAX_BYTES_PER_TX * FEE_PER_BYTE;
export const GLOBAL_ORDERBOOK_MARKET_RATE = 0.05;
export const FEE_SATS = 125;
export const P2PKH_INPUT_SIZE = 148;
export const P2PKH_OUTPUT_SIZE = 34;
export const DUST = 10;
export const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes
export const SNACKBAR_TIMEOUT = 2.5 * 1000; // 2.5 seconds
export const HOSTED_PANDA_IMAGE = 'https://i.ibb.co/3fLL5X2/Panda-Wallet-Logo.png';
export const PANDA_DEV_WALLET = '1MtzWXQEYGp89bQ9U2nfrnuChFv37j6pV6';
export const PROVIDER_DOCS_URL = 'https://panda-wallet.gitbook.io/provider-api/intro/introduction';

export const DEFAULT_WALLET_PATH = "m/44'/236'/0'/1/0";
export const DEFAULT_ORD_PATH = "m/44'/236'/1'/0/0";
export const DEFAULT_RELAYX_ORD_PATH = "m/44'/236'/0'/2/0";
export const SWEEP_PATH = "m/44'/236'/0'/0/0";
export const DEFAULT_IDENTITY_PATH = "m/0'/236'/0'/0/0";
export const DEFAULT_TWETCH_WALLET_PATH = 'm/0/0';
export const DEFAULT_AYM_WALLET_PATH = 'm/0/0';
export const DEFAULT_AYM_ORD_PATH = 'm';

export const SCRYPT_PREFIX =
  '2097dfd76851bf465e8f715593b217714858bbe9570ff3bd5e33840a34e20ff0262102ba79df5f8ae7604a9830f03c7933028186aede0675a16f025dc4f8be8eec0382201008ce7480da41702918d1ec8e6849ba32b4d65b1e40dc669c31a1e6306b266c0000';
export const O_LOCK_SUFFIX =
  '615179547a75537a537a537a0079537a75527a527a7575615579008763567901c161517957795779210ac407f0e4bd44bfc207355a778b046225a7068fc59ee7eda43ad905aadbffc800206c266b30e6a1319c66dc401e5bd6b432ba49688eecd118297041da8074ce081059795679615679aa0079610079517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e01007e81517a75615779567956795679567961537956795479577995939521414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00517951796151795179970079009f63007952799367007968517a75517a75517a7561527a75517a517951795296a0630079527994527a75517a6853798277527982775379012080517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e01205279947f7754537993527993013051797e527e54797e58797e527e53797e52797e57797e0079517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a756100795779ac517a75517a75517a75517a75517a75517a75517a75517a75517a7561517a75517a756169587951797e58797eaa577961007982775179517958947f7551790128947f77517a75517a75618777777777777777777767557951876351795779a9876957795779ac777777777777777767006868';
export const LOCK_SUFFIX =
  '610079040065cd1d9f690079547a75537a537a537a5179537a75527a527a7575615579014161517957795779210ac407f0e4bd44bfc207355a778b046225a7068fc59ee7eda43ad905aadbffc800206c266b30e6a1319c66dc401e5bd6b432ba49688eecd118297041da8074ce081059795679615679aa0079610079517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e01007e81517a75615779567956795679567961537956795479577995939521414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff00517951796151795179970079009f63007952799367007968517a75517a75517a7561527a75517a517951795296a0630079527994527a75517a6853798277527982775379012080517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f517f7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e7c7e01205279947f7754537993527993013051797e527e54797e58797e527e53797e52797e57797e0079517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a75517a756100795779ac517a75517a75517a75517a75517a75517a75517a75517a75517a7561517a75517a756169557961007961007982775179517954947f75517958947f77517a75517a756161007901007e81517a7561517a7561040065cd1d9f6955796100796100798277517951790128947f755179012c947f77517a75517a756161007901007e81517a7561517a756105ffffffff009f69557961007961007982775179517954947f75517958947f77517a75517a756161007901007e81517a7561517a75615279a2695679a95179876957795779ac7777777777777777';

export const whiteListedColorThemeCollections = [
  '1faa3f6a9cf372cc80c812fdd3d2c08dbba15bcd6a5bf636eda4780daf64f98b_0', // Midnight Mint
];

// Featured 3rd party integrations
export const featuredApps = [
  {
    icon: 'https://pbs.twimg.com/profile_images/1469020626912354306/4WA3cIs3_400x400.jpg',
    name: 'Take It NFT',
    link: 'https://www.takeitm/marketplace/global',
  },
  {
    icon: 'https://taleofshua.com/assets/shua_swd_512.png',
    name: 'Tale of Shua',
    link: 'https://taleofshua.com/profile/',
  },
  {
    icon: 'https://pbs.twimg.com/profile_images/1222666970203471873/zn3OPLG0_400x400.jpg',
    name: 'sCrypt',
    link: 'https://docs.scrypt.io/tokens/tutorials/ordinal-lock/#use-panda-wallet',
  },
  {
    icon: 'https://pbs.twimg.com/profile_images/1555622553799892993/m0C6BWiv_400x400.jpg',
    name: 'Haste Arcade',
    link: 'https://hastearcade.com',
  },
  {
    icon: 'https://pbs.twimg.com/profile_images/1671319128593031170/MZ_B266m_400x400.jpg',
    name: 'Library of Babel',
    link: 'https://babel.markets',
  },
];
