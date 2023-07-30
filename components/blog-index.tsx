import React from 'react';
import { getPagesUnderRoute } from 'nextra/context';
import filterRouteLocale from 'nextra/filter-route-locale';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Page {
  route: string;
  name: string;
  meta: {
    title?: string;
  };
  frontMatter: {
    title?: string;
    description?: string;
    date?: string;
  };
}

interface BlogPostItemProps {
  page: Page;
  moreText: string;
}

interface BlogIndexProps {
  more?: string;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ page, moreText }) => (
  <div key={page.route} className="mb-10">
    <h3>
      <Link
        href={page.route}
        passHref
        style={{ color: 'inherit', textDecoration: 'none' }}
        className="block font-semibold mt-8 text-2xl"
      >
        {page.meta.title || page.frontMatter.title || page.name}
      </Link>
    </h3>
    <p className="opacity-80 mt-6 leading-7">
      {page.frontMatter.description}{' '}
      <span className="inline-block">
        <Link
          href={page.route}
          passHref
          className="text-[color:hsl(var(--nextra-primary-hue),100%,50%)] underline underline-offset-2 decoration-from-font"
        >
          {moreText + ' →'}
        </Link>
      </span>
    </p>
    {page.frontMatter.date && <p className="opacity-50 text-sm mt-6 leading-7">{page.frontMatter.date}</p>}
  </div>
);

const BlogIndex: React.FC<BlogIndexProps> = ({ more = 'Read more' }) => {
  const { locale, defaultLocale } = useRouter();
  const blogPages = filterRouteLocale(getPagesUnderRoute('/blog'), locale, defaultLocale);

  return <>
    {blogPages.map((page: Page) => <BlogPostItem page={page} moreText={more} key={page.route} />)}
  </>;
};

export default BlogIndex;
