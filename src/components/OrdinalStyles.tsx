// OrdinalStyles.tsx

import styled from 'styled-components';
import { Text } from './Reusable';

export type OrdinalDivProps = {
  url: string;
  selected?: boolean;
  size?: string;
};

export const ImageOverlay = styled.div<{ $isExpanded: boolean; $imageurl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 1rem;
  z-index: 1;
  cursor: pointer;
  transition: opacity 0.3s ease;
  ${(props) => (props.$isExpanded ? 'pointer-events: none;' : 'pointer-events: auto;')}
`;

export const HtmlWrapper = styled.iframe<{ $isExpanded: boolean; $url: string } & OrdinalDivProps>`
  height: ${(props) => (props.$isExpanded ? '90vh' : props.size ?? '35rem')};
  width: ${(props) => (props.$isExpanded ? '100vw' : props.size ?? '25rem')};
  border: none;
  cursor: pointer;
`;

export const OrdText = styled(Text) <{ $isExpanded: boolean }>`
  color: ${(props) => props.theme.primaryButton};
  text-align: center;
  width: 100%;
  margin: 0;
  font-size: 90%;
  display: ${(props) => (props.$isExpanded ? 'none' : 'block')};
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin:
`;

export const FullScreenWrapper = styled.div<{ $isExpanded: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #1a1b21;
  z-index: 3;
  display: ${(props) => (props.$isExpanded ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FullScreenIframe = styled.iframe`
  width: 100vw;
  height: 100vh;
  border: none;
  display: block;
  margin: 15px;
`;

export const FullScreenButton = styled.button`
  background-color: #8B734C;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 45px;
  position: center;
`;
