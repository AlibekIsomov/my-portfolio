import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

const parseSeedValues = (sql: string) => {
  const valuesIndex = sql.indexOf('VALUES');
  if (valuesIndex === -1) {
    return [];
  }
  const insertSection = sql.slice(valuesIndex + 'VALUES'.length);
  const upsertIndex = insertSection.toUpperCase().lastIndexOf('ON CONFLICT');
  const valuesSection = upsertIndex === -1 ? insertSection : insertSection.slice(0, upsertIndex);

  const matches = valuesSection.match(/\('([^']*)'\s*,\s*'([^']*)'\s*,\s*'((?:[^']|'')*)'\)/g);
  if (!matches) {
    return [];
  }
  return matches.map(match => {
    const parts = match.match(/\('([^']*)'\s*,\s*'([^']*)'\s*,\s*'((?:[^']|'')*)'\)/);
    if (!parts) {
      return null;
    }
    return {
      pageSlug: parts[1],
      contentKey: parts[2],
      value: parts[3].replace(/''/g, "'"),
    };
  }).filter(Boolean);
};

const seed = async () => {
  const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
  const schema = await fs.readFile(schemaPath, 'utf8');
  const values = parseSeedValues(schema) as { pageSlug: string; contentKey: string; value: string }[];

  if (values.length === 0) {
    console.warn('No seed values found in schema.sql');
    return;
  }

  await prisma.$transaction(
    values.map(value =>
      prisma.contentItem.upsert({
        where: {
          pageSlug_contentKey: {
            pageSlug: value.pageSlug,
            contentKey: value.contentKey,
          },
        },
        create: value,
        update: { value: value.value },
      }),
    ),
  );
};

seed()
  .catch(error => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
