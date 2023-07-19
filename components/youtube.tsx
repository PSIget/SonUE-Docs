import React from 'react';

interface YoutubeProps {
  code: string;
}

const Youtube: React.FC<YoutubeProps> = ({ code }) => {
  return (
    <div className="video-container nx-mt-6">
      <iframe
        loading="lazy"
        className="video"
        src={`https://www.youtube.com/embed/${code}`}
        allowFullScreen
      />
    </div>
  );
};

export { Youtube };
