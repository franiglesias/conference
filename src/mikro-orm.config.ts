import { defineConfig, SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ProposalEntity } from './proposals/infrastructure/persistence/Proposal.entity';

export default defineConfig({
  // for simplicity, we use the SQLite database, as it's available pretty much everywhere
  driver: SqliteDriver,
  dbName: process.env.DB_NAME ?? '../data/local.db',
  // folder-based discovery setup, using common filename suffix
  entities: [ProposalEntity],
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
});
