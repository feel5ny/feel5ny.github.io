import { readFileSync } from 'fs';
import { join } from 'path';

export type UrlMapping = {
  oldUrl: string;
  newUrl: string;
  date: string;
};

export function loadUrlMapping(): UrlMapping[] {
  try {
    const mappingPath = join(
      process.cwd(),
      '../feel5ny_blog/docs/migration/nextra-url-mapping.json'
    );
    const mappingData = readFileSync(mappingPath, 'utf-8');
    return JSON.parse(mappingData);
  } catch (error) {
    console.warn('⚠️  URL mapping file not found. Using default paths.');
    return [];
  }
}

