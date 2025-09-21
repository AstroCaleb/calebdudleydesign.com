import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../useAppContext';

interface ImageProps {
  file: string;
  thumb: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PortfolioItemProps {
  companyName: string;
  companyLink?: string;
  currentRole?: string;
  dateRange?: string;
  copy: string[];
  imageProjectKey?: string;
  images?: ImageProps[];
  showNextGroupLineConnection?: boolean;
}

export const PortfolioItem: React.FC<{ data: PortfolioItemProps }> = ({
  data,
}) => {
  const {
    companyName,
    companyLink,
    currentRole,
    dateRange,
    copy,
    imageProjectKey,
    images,
    showNextGroupLineConnection = true,
  } = data;
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 500px',
  });
  const [areImagesLoadedInView, setAreImagesLoadedInView] = useState(false);
  const { isImageViewerOpen, setIsImageViewerOpen, setImageViewerArray } =
    useAppContext();
  const [imageSrcArray, setImageSrcArray] = useState<
    { src: string; alt?: string }[]
  >([]);

  useEffect(() => {
    if (!images) return;
    const imageSrcArray = images.map((image) => ({
      src: `/images/projects/${imageProjectKey}/${image.file}`,
      alt: image.alt ?? '',
    }));
    setImageSrcArray(imageSrcArray);
  }, [imageProjectKey, images]);

  useEffect(() => {
    if (!isImageViewerOpen) {
      setImageViewerArray([]);
    }
  }, [isImageViewerOpen, setImageViewerArray]);

  useEffect(() => {
    if (inView && images && !areImagesLoadedInView) {
      setAreImagesLoadedInView(true);
    }
  }, [inView, images, areImagesLoadedInView]);

  return (
    <div
      className={`subgroup ${showNextGroupLineConnection ? 'show-next-group-line-connection' : ''}`}
      aria-label={dateRange}
      ref={ref}
    >
      {dateRange && (
        <div className="time-frame">
          <p>{dateRange}</p>
        </div>
      )}
      <div className="item" tabIndex={0}>
        {images && (
          <div className="item-media">
            {images.map((image, index) => (
              <span
                key={`${imageProjectKey}-${image.file}-${index}`}
                onClick={() => {
                  setImageViewerArray(imageSrcArray);
                  setIsImageViewerOpen(!isImageViewerOpen);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setImageViewerArray(imageSrcArray);
                    setIsImageViewerOpen(!isImageViewerOpen);
                  }
                }}
                tabIndex={index === 0 ? 0 : -1}
              >
                <img
                  key={index}
                  src={
                    areImagesLoadedInView
                      ? `/images/projects/${imageProjectKey}/${image.thumb}`
                      : '/images/projects/placeholder.png'
                  }
                  alt={image.alt}
                  width={image.width}
                />
              </span>
            ))}
          </div>
        )}
        <div className="item-description">
          {companyLink ? (
            <a
              href={companyLink}
              className="title-link"
              target="_blank"
              rel="noreferrer"
            >
              {companyName}
            </a>
          ) : (
            <p className="title">{companyName}</p>
          )}
          <div className="item-description-inner">
            {currentRole && <p className="copy current-role">{currentRole}</p>}
            {copy.map((paragraph, index) => (
              <p
                className="copy"
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
