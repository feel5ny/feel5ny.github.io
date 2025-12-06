'use client';

import * as React from 'react';

type Props = {
  thumbnail: string;
  alt: string;
};

export function PostThumbnail({ thumbnail, alt }: Props) {
  const [thumbnailError, setThumbnailError] = React.useState(false);

  if (thumbnailError || !thumbnail) {
    return null;
  }

  return (
    <div className="mb-6 -mx-4 md:-mx-8 lg:-mx-12">
      <img
        src={thumbnail}
        alt={alt}
        className="w-full h-auto object-cover rounded-lg"
        onError={() => {
          console.warn(`Failed to load thumbnail: ${thumbnail}`);
          setThumbnailError(true);
        }}
      />
    </div>
  );
}

