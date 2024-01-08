import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import getRandomImage from '..//randomRenderImage';

interface PandaImgProps {
  width?: string;
  glow?: boolean | string;
}

const StyledImg = styled.img<PandaImgProps>`
  width: ${(props) => props.width ?? '6.25rem'};
  height: ${(props) => props.width ?? '6.25rem'};
  
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.glow &&
    css`
      box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.7);
    `}
`;

export type PandaHeadProps = {
  width?: string;
  glow?: boolean;
};

export const PandaHead = (props: PandaHeadProps) => {
  const { width, glow } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  useEffect(() => {
    const image = getRandomImage();
    setRandomImage(image);
  }, []);

  return (
    <StyledImg
      ref={imgRef}
      src={randomImage?.toString()}
      width={width}
      alt="Panda Head"
      glow={glow ? 'true' : 'false'}
      style={{ width: '6rem', height: 'auto', borderRadius: '5px' }}
      as="img" // Specify the HTML element to render
    />
  );
};
