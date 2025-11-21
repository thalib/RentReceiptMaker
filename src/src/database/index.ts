/**
 * RxDB database initialization and setup
 */

import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { draftSchema, receiptSchema } from './schemas';
import type { DraftData, ReceiptData } from '../types/receipt';
import type { RxDatabase, RxCollection } from 'rxdb';

// Define database collections type
export interface ReceiptCollections {
  drafts: RxCollection<DraftData>;
  receipts: RxCollection<ReceiptData>;
}

export type ReceiptDatabase = RxDatabase<ReceiptCollections>;

let dbInstance: ReceiptDatabase | null = null;

/**
 * Initialize the database (singleton pattern)
 */
export async function initDatabase(): Promise<ReceiptDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    // Create database with Dexie storage (IndexedDB adapter)
    const db = await createRxDatabase<ReceiptCollections>({
      name: 'rentreceiptdb',
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });

    // Add collections
    await db.addCollections({
      drafts: {
        schema: draftSchema,
      },
      receipts: {
        schema: receiptSchema,
      },
    });

    dbInstance = db;
    console.log('✅ Database initialized successfully');
    return db;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Get the database instance (must be initialized first)
 */
export function getDatabase(): ReceiptDatabase {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return dbInstance;
}

/**
 * Close the database connection
 */
export async function closeDatabase(): Promise<void> {
  if (dbInstance) {
    await dbInstance.remove();
    dbInstance = null;
    console.log('✅ Database closed');
  }
}
