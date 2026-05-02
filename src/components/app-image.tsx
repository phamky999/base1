import { Image, Skeleton, type ImageProps } from 'antd';
import { useState } from 'react';

export const AppImage = ({ ...imageProps }: ImageProps) => {
  const [error, setError] = useState(false);

  return (
    <div className="h-full w-full">
      {error ? (
        <Skeleton.Image className="h-full w-full" />
      ) : (
        <Image
          className="h-full w-full object-cover object-center"
          placeholder={<Skeleton.Image active className="h-full w-full" />}
          onError={() => setError(true)}
          {...imageProps}
        />
      )}
    </div>
  );
};
