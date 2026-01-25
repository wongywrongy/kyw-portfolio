// Quick verification script to check if schemas are loading
import { schemaTypes } from './schemas/index.js';

console.log('Schema types found:', schemaTypes.length);
schemaTypes.forEach((schema, index) => {
  console.log(`${index + 1}. ${schema.name} - ${schema.title}`);
});

if (schemaTypes.length === 0) {
  console.error('❌ No schemas found! Check your schema files.');
  process.exit(1);
} else {
  console.log('✅ Schemas loaded successfully!');
}
