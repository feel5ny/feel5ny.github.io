# Nextra Blog v4 Template

A modern, feature-rich blog template built with [Nextra v4](https://nextra.site).

## 🚀 Demo

- [Official Nextra Documentation](https://nextra.site)
- [Live Demo of This Template](https://nextra-blog-v4.vercel.app/)

## 🛠 Getting Started

### Prerequisites

- Node.js 18.0 or later
- pnpm

### Installation

1. Clone this template:

```bash
git clone https://github.com/yourusername/nextra-v4-blog-template.git
cd nextra-v4-blog-template
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

1. Create a new `.mdx` file in the `pages/posts` directory
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