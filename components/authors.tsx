import React, { ReactNode } from 'react';

interface AuthorsProps {
  date: string;
  children: ReactNode;
  by?: string;
}

const Authors: React.FC<AuthorsProps> = ({ date, children, by = 'Автор:' }) => {
  return (
    <div className="mt-4 mb-16 text-gray-500 text-sm">
      {date} {by} {children}
    </div>
  );
};

interface AuthorProps {
  name: string;
  link: string;
}

export const Author: React.FC<AuthorProps> = ({ name, link }) => {
  return (
    <span className="after:content-[','] last:after:content-['']">
      <a
        href={link}
        target="_blank"
        className="mx-1 text-current underline [text-underline-position:from-font] decoration-from-font"
        rel="noreferrer"
      >
        {name}
      </a>
    </span>
  );
};

export default Authors;
