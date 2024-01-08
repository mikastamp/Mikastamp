export interface Theme {
  darkAccent: string;
  mainBackground: string;
  mainBackgroundImg: string;
  lightAccent: string;
  primaryButton: string;
  white: string;
  black: string;
  errorRed: string;
  tabColor: string;
}

export type ColorThemeProps = {
  theme: Theme;
};

export const defaultTheme: Theme = {
  darkAccent: '#15151f',
  mainBackground: '#000',
  mainBackgroundImg: 'url(https://mikastamp.com/wp-content/uploads/2023/12/art-studio-mikastamp.jpg)',
  lightAccent: '#F4EAE0',
  primaryButton: '#8b734c',
  white: '#F0ECE5',
  black: '#1a1b21',
  errorRed: '#FF4646',
  tabColor: '#F4DFC8'

};

export const transferCreditTextStyle: React.CSSProperties = {
  color: defaultTheme.primaryButton, // Choose the color from your theme
  fontSize: '1rem', // Adjust the font size as needed
  // Add other styles as needed
};
