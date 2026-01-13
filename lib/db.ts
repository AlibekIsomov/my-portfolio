type PgPool = {
  query: (text: string, values?: unknown[]) => Promise<{ rows: any[]; rowCount?: number }>;
};

const globalForPg = globalThis as typeof globalThis & { pgPool?: PgPool };

export const getPgPool = async (): Promise<PgPool> => {
  if (globalForPg.pgPool) {
    return globalForPg.pgPool;
  }

  try {
    const { Pool } = await import('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    if (process.env.NODE_ENV !== 'production') {
      globalForPg.pgPool = pool;
    }
    return pool;
  } catch (error) {
    throw new Error('PostgreSQL client not available. Install pg and set DATABASE_URL.');
  }
};
