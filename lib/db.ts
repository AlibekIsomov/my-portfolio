type PgPool = {
  query: (text: string, values?: unknown[]) => Promise<{ rows: any[]; rowCount?: number }>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const getPgPool = async (): Promise<PgPool> => {
  throw new Error('Legacy pg pool disabled. Use Prisma client instead.');
};
