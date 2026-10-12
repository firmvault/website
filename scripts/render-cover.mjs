import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require(process.env.FIRMVAULT_SHARP_PATH || 'sharp');
await sharp('dist/assets/social-cover.svg').png().toFile('dist/assets/social-cover.png');
console.log('Rendered the social sharing image with the approved logo.');
