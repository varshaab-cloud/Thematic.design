import StyleDictionary from 'style-dictionary';
import { mkdirSync } from 'fs';

// Ensure output directory exists
mkdirSync('src/styles', { recursive: true });

const sd = new StyleDictionary({
  source: ['tokens/tokens.json'],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: false
          }
        }
      ]
    }
  }
});

await sd.buildAllPlatforms();
console.log('Tokens built successfully!');
