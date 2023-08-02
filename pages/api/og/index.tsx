import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { CSSProperties } from 'react';

export const config = {
  runtime: 'edge',
};

// Constants
const DEFAULT_TITLE = '';
const DEFAULT_CATEGORY = '';

// Styles
const logoContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
};

const textStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: '16px',
};

const titleStyle: CSSProperties = {
  color: '#FFF',
  fontFamily: 'Inter',
  fontSize: '64px',
  fontWeight: '700',
  lineHeight: '76px',
  letterSpacing: '-1.28px',
  textAlign: 'center',
  textOverflow: "ellipsis",
};

const categoryStyle: CSSProperties = {
  color: '#888',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '36px',
  letterSpacing: '6.4px',
  textTransform: 'uppercase',
};

interface LogoContainerProps {
  base64PngIcon: string;
  base64SvgIcon: string;
}

function LogoContainer({ base64PngIcon, base64SvgIcon }: LogoContainerProps) {
  return (
    <div aria-label='Logo' style={logoContainerStyle}>
      <img width={256} src={base64PngIcon} alt="" />
      <img height={56} src={base64SvgIcon} alt="" />
    </div>
  )
}

interface TextContainerProps {
  title: string;
  categoryName: string;
}

function TextContainer({ title = DEFAULT_TITLE, categoryName }: TextContainerProps) {
  return (
    <div aria-label='Text' style={textStyle}>
      <div aria-label='H1' style={titleStyle}>
        {title}
      </div>
      <div style={categoryStyle}>
        {categoryName}
      </div>
    </div>
  )
}

// Helper function to fetch images as base64 strings
async function fetchImageAsBase64(url: URL, mimeType: string): Promise<string> {
  const response = await fetch(url.toString());
  const buffer = await response.arrayBuffer();
  const base64String = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  return `data:${mimeType};base64,${base64String}`;
}

// Helper function to get category name by slug
function getCategoryNameBySlug(slug: string | null): string {
  switch (slug) {
    case 'index':
      return 'Главная страница';
    case 'blog':
      return 'Блог';
    case 'docs':
      return 'Документация';
    case 'roadmap':
      return 'Дорожная карта';
    default:
      return '';
  }
}

export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Use destructuring and default parameter value for title and category
    const title = (searchParams.get('title') ?? DEFAULT_TITLE).slice(0, 100);
    const category = searchParams.get('cat') ?? DEFAULT_CATEGORY;

    const categoryName = getCategoryNameBySlug(category);

    const [fontDataRegular, fontDataMedium, fontDataBold] = await Promise.all([
      fetch(new URL('./Inter-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer()),
      fetch(new URL('./Inter-Medium.ttf', import.meta.url)).then((res) => res.arrayBuffer()),
      fetch(new URL('./Inter-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer()),
    ]);

    const base64PngBg = await fetchImageAsBase64(new URL('./BG.jpg', import.meta.url), 'image/jpeg');
    const base64PngIcon = await fetchImageAsBase64(new URL('./Icon.png', import.meta.url), 'image/png');
    const base64SvgIcon = await fetchImageAsBase64(new URL('./Text.svg', import.meta.url), 'image/svg+xml');

    const containerStyle: CSSProperties = {
      display: "flex",
      width: "100%",
      height: "100%",
      padding: '64px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',
      background: '#000',
      backgroundImage: `url(${base64PngBg})`,
    };

    return new ImageResponse(
      (
        <div style={containerStyle}>
          <LogoContainer base64PngIcon={base64PngIcon} base64SvgIcon={base64SvgIcon} />
          <TextContainer title={title} categoryName={categoryName} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontDataRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: fontDataMedium,
            weight: 500,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: fontDataBold,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    console.error(`Error generating image: ${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
