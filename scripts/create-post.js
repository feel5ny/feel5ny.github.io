#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-가-힣]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function createPost() {
  console.log('📝 새로운 포스트 생성\n');

  const title = await question('제목: ');
  if (!title) {
    console.log('❌ 제목은 필수입니다.');
    rl.close();
    return;
  }

  const date = await question(`날짜 (기본값: ${getCurrentDate()}): `) || getCurrentDate();
  const description = await question('설명: ');
  const author = await question('작성자 (기본값: Joy Kim): ') || 'Joy Kim';
  
  const tagsInput = await question('태그 (쉼표로 구분): ');
  const tags = tagsInput
    ? tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  const categoriesInput = await question('카테고리 (쉼표로 구분): ');
  const categories = categoriesInput
    ? categoriesInput.split(',').map(cat => cat.trim()).filter(Boolean)
    : [];

  const enableComment = await question('댓글 활성화? (y/n, 기본값: y): ') || 'y';
  const thumbnail = await question('썸네일 경로 (선택): ');

  const slug = slugify(title);
  const fileName = `${slug}.mdx`;
  const filePath = path.join(__dirname, '../content/posts', fileName);

  if (fs.existsSync(filePath)) {
    console.log(`❌ 파일이 이미 존재합니다: ${fileName}`);
    rl.close();
    return;
  }

  const frontMatter = `---
title: ${title.includes(':') || title.includes("'") ? `"${title}"` : title}
date: '${date}'
description: >-
  ${description || '포스트 설명을 입력하세요.'}
author: ${author}
${tags.length > 0 ? `tags:\n${tags.map(tag => `  - ${tag}`).join('\n')}` : 'tags: []'}
${categories.length > 0 ? `categories:\n${categories.map(cat => cat.includes(' ') ? `  - "${cat}"` : `  - ${cat}`).join('\n')}` : 'categories: []'}
enableComment: ${enableComment.toLowerCase() === 'n' ? 'false' : 'true'}
${thumbnail ? `thumbnail: ${thumbnail}` : ''}
---

`;

  fs.writeFileSync(filePath, frontMatter, 'utf8');
  console.log(`\n✅ 포스트가 생성되었습니다: ${filePath}`);
  console.log(`📄 파일명: ${fileName}`);
  rl.close();
}

createPost().catch(error => {
  console.error('❌ 에러 발생:', error);
  rl.close();
  process.exit(1);
});

