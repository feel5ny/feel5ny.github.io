#!/usr/bin/env node

/**
 * 빌드 후 XML 파일의 Content-Type을 보장하기 위한 스크립트
 * GitHub Pages에서 XML 파일이 올바르게 서빙되도록 함
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const xmlFiles = [
  'sitemap.xml',
  'tag-sitemap.xml',
  'category-sitemap.xml',
  'post-sitemap.xml',
  'rss.xml',
  'feed.xml',
];

// XML 파일이 올바른 형식인지 확인하고 필요시 수정
xmlFiles.forEach(file => {
  const filePath = path.join(outDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  파일이 없습니다: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // xml-stylesheet 선언 제거 (존재하는 경우)
  content = content.replace(/<\?xml-stylesheet[^>]*\?>\s*/g, '');
  
  // XML 선언이 올바른지 확인 (공백 허용)
  if (!content.trim().startsWith('<?xml version="1.0" encoding="UTF-8"')) {
    console.warn(`⚠️  ${file}: XML 선언이 올바르지 않습니다`);
  }
  
  // 파일 저장
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${file} 처리 완료`);
});

console.log('✅ 모든 XML 파일 처리 완료');

