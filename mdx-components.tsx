import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog';
import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components';
import { Posts } from '@/components/posts';
import { Tags } from '@/components/tags';
import { CustomTOC } from '@/components/custom-toc';
import { CustomTodo } from '@/components/custom-todo';
import { slugify } from '@/lib/slugify';
import React from 'react';

function getHeadingId(children: React.ReactNode, id?: string): string | undefined {
  if (id) return id;

  // children에서 텍스트 추출
  if (typeof children === 'string') {
    return slugify(children);
  }

  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (typeof props.children === 'string') {
      return slugify(props.children);
    }
  }

  // children이 배열인 경우
  if (Array.isArray(children)) {
    const text = children
      .map(child => {
        if (typeof child === 'string') return child;
        if (React.isValidElement(child)) {
          const childProps = child.props as { children?: React.ReactNode };
          if (typeof childProps.children === 'string') {
            return childProps.children;
          }
        }
        return '';
      })
      .join(' ')
      .trim();
    return text ? slugify(text) : undefined;
  }

  return undefined;
}

const blogComponents = getBlogMDXComponents({
  h1: ({ children, id, ...props }) => {
    const headingId = getHeadingId(children, id);
    return (
      <h1 id={headingId} className="custom-h1" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, id, ...props }) => {
    const headingId = getHeadingId(children, id);
    return (
      <h2 id={headingId} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, id, ...props }) => {
    const headingId = getHeadingId(children, id);
    return (
      <h3 id={headingId} {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, id, ...props }) => {
    const headingId = getHeadingId(children, id);
    return (
      <h4 id={headingId} {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ children, id, ...props }) => {
    const headingId = getHeadingId(children, id);
    return (
      <h5 id={headingId} {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ children, id, ...props }) => {
    const headingId = getHeadingId(children, id);
    return (
      <h6 id={headingId} {...props}>
        {children}
      </h6>
    );
  },
  img: ({ src, alt, ...props }) => {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-lg"
        {...props}
      />
    );
  },
  figure: ({ children, ...props }) => {
    return (
      <figure {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === 'img') {
            return React.cloneElement(child, {
              className: `rounded-lg ${child.props.className || ''}`,
            } as any);
          }
          return child;
        })}
      </figure>
    );
  },
  DateFormatter: ({ date }) =>
    `Last updated at ${date.toLocaleDateString('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`,
});

const defaultComponents = getNextraComponents({
  wrapper({ children, toc }) {
    return (
      <>
        {children}

        {/*<TOC toc={toc}/>*/}
      </>
    );
  },
});

export function useMDXComponents() {
  return {
    ...blogComponents,
    ...defaultComponents,
    Posts: Posts,
    Tags: Tags,
    CustomTOC: CustomTOC,
    CustomTodo: CustomTodo,
  };
}
