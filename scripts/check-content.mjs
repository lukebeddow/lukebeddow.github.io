// Pre-build guard: Astro's file() loader logs a YAML syntax error and carries on with an empty
// collection, so a broken file would ship a page with a missing section. This fails the build instead.
import { readdirSync, readFileSync } from 'node:fs';
import { parseDocument } from 'yaml';

const dir = 'src/content';
let failed = false;
for (const name of readdirSync(dir).filter((f) => f.endsWith('.yaml'))) {
  const doc = parseDocument(readFileSync(`${dir}/${name}`, 'utf8'), { uniqueKeys: true });
  const data = doc.toJS();
  const count = Array.isArray(data) ? data.length : data && typeof data === 'object' ? Object.keys(data).length : 0;
  if (doc.errors.length) {
    failed = true;
    for (const e of doc.errors) console.error(`${dir}/${name}: ${e.message}`);
  } else if (count === 0) {
    failed = true;
    console.error(`${dir}/${name}: no entries`);
  } else {
    console.log(`${dir}/${name}: ${count} entries`);
  }
}
if (failed) process.exit(1);
