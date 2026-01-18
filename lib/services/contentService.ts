import { prisma } from '../prisma';

export type ContentItemInput = {
  pageSlug: string;
  key: string;
  value: string;
};

export const listContentItems = async (pageSlug?: string) =>
  prisma.contentItem.findMany({
    where: pageSlug ? { pageSlug } : undefined,
    orderBy: pageSlug ? { id: 'asc' } : [{ pageSlug: 'asc' }, { id: 'asc' }],
  });

export const upsertContentItem = async (input: ContentItemInput) =>
  prisma.contentItem.upsert({
    where: {
      pageSlug_contentKey: {
        pageSlug: input.pageSlug,
        contentKey: input.key,
      },
    },
    create: {
      pageSlug: input.pageSlug,
      contentKey: input.key,
      value: input.value,
    },
    update: {
      value: input.value,
    },
  });

export const updateContentItem = async (id: number, input: ContentItemInput) =>
  prisma.contentItem.update({
    where: { id },
    data: {
      pageSlug: input.pageSlug,
      contentKey: input.key,
      value: input.value,
    },
  });

export const deleteContentItem = async (id: number) =>
  prisma.contentItem.delete({ where: { id } });
