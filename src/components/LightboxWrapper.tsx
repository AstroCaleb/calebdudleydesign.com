import React, { useEffect, useRef } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import { useAppContext } from '../useAppContext';

export const LightboxWrapper: React.FC = () => {
  const {
    isImageViewerOpen,
    setIsImageViewerOpen,
    imageViewerArray,
    setImageViewerArray,
  } = useAppContext();
  const thumbnailsRef = useRef(null);

  useEffect(() => {
    if (!isImageViewerOpen) {
      setTimeout(() => {
        setImageViewerArray([]);
      }, 500);
    }
  }, [isImageViewerOpen, setImageViewerArray]);

  return (
    <>
      {imageViewerArray && (
        <Lightbox
          open={isImageViewerOpen}
          close={() => setIsImageViewerOpen(false)}
          controller={{
            closeOnBackdropClick: true,
          }}
          slides={imageViewerArray}
          carousel={{
            finite: true,
            preload: 3,
          }}
          animation={{
            navigation: 0,
          }}
          plugins={[Thumbnails, Counter]}
          thumbnails={{
            ref: thumbnailsRef,
            borderColor: 'transparent',
            height: 50,
            width: 80,
            gap: 8,
          }}
          on={{
            click: () => {
              // @ts-expect-error Lightbox recommended code
              (thumbnailsRef.current?.visible
                ? // @ts-expect-error Lightbox recommended code
                  thumbnailsRef.current?.hide
                : // @ts-expect-error Lightbox recommended code
                  thumbnailsRef.current?.show)?.();
            },
          }}
          counter={{ container: { style: { top: 0 } } }}
          styles={{ thumbnail: { boxShadow: 'none' } }}
        />
      )}
    </>
  );
};
