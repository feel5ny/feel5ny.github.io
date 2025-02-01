# Nextra Blog v4 Starter

A modern, feature-rich blog template built with [Nextra v4](https://nextra.site).

## 🚀 Demo

- [Official Nextra Documentation](https://nextra.site)
- [Live Demo of This Template](https://nextra-blog-v4.vercel.app/)

## Features

- [Nextra v4](https://nextra.site/docs) runs on Next.js v15 and React v19
- Tailwind CSS and TypeScript support
- Ready-to-use blog post files with
  Search ([Pagefind](https://the-guild.dev/blog/nextra-4#new-search-engine--pagefind)), and Tags.
- Commenting system with [Giscus](https://giscus.app/)
- Use [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) in Next.js App Router with [next-view-transitions](https://github.com/shuding/next-view-transitions)

## 🛠 Getting Started

### Prerequisites

- Node.js 18.0 or later
- pnpm

### Installation

1. Clone this template:

```bash
git clone https://github.com/phucbm/nextra-blog-v4-starter.git
cd nextra-blog-v4
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Usage

### Adding New Posts

1. Create a new `.mdx` file in the `content` directory
2. Add your front matter at the top of the file:

```yaml
---
title: Your Post Title
date: 2025/1/30
description: A brief description of your post
tags: [ "web development", "react" ]
author: Your Name
---
```

3. Write your content in MDX format below the front matter

### Customization

- Edit `theme.config.tsx` to customize your blog's appearance and behavior
- Modify styles in `styles/global.css`
- Update site metadata in `pages/_app.tsx`

---

Created with ❤️ by [Your Name]

Don't forget to ⭐ this repository if you found it helpful!