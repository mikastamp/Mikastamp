// ImageOverlayComponent.tsx

import React, { useEffect, useState } from 'react';

const ImageOverlayComponent = (props: { isExpanded: boolean; imageurl: string }) => {
    const [specificImageurl, setSpecificImageurl] = useState<string | null>(null);

    useEffect(() => {
        fetch(props.imageurl)
            .then((response) => response.text())
            .then((htmlContent) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                const iframeElement = doc.querySelector('iframe');
                const extractedImageurl = iframeElement?.getAttribute('src') || null;

                setSpecificImageurl(extractedImageurl);
            })
            .catch((error) => {
                console.error('Error fetching HTML content:', error);
            });
    }, [props.imageurl]);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '1rem',
                zIndex: 1,
                cursor: 'pointer',
                backgroundImage: specificImageurl ? `url(${specificImageurl})` : 'none',
                pointerEvents: props.isExpanded ? 'none' : 'auto',
            }}
        />
    );
};

export default ImageOverlayComponent;
