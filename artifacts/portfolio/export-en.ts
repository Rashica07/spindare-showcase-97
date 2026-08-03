import { translations } from './lib/i18n';
import fs from 'fs';
fs.writeFileSync('en-dict.json', JSON.stringify(translations.en, null, 2));
