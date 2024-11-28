import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { ProposalRepository } from '../domain/Proposal/ProposalRepository';
import { Proposal } from '../domain/Proposal/Proposal';

@Injectable()
export class SqliteProposalRepository implements ProposalRepository {
  constructor(@Inject() private readonly em: EntityManager) {}

  async store(proposal: Proposal): Promise<void> {
    // This call should await the result of the insert operation
    // otherwise the caller will not know if the operation was successful
    const toStore = proposal.mapToRaw();
    const knex = this.em.getKnex();
    // Columns are defined as not null, that's why I'm passing all the fields
    await knex.insert(toStore).into('proposal_entity');
    return Promise.resolve();
  }

  async retrieve(id: string): Promise<Proposal> {
    const knex = this.em.getKnex();

    const raw = await knex
      .select('*')
      .from('proposal_entity')
      .where({ id })
      .first();

    if (!raw) {
      throw new Error('Proposal not found');
    }
    return Proposal.fromRaw(
      raw.id,
      raw.title,
      raw.description,
      raw.name,
      raw.surname,
      raw.email,
      raw.event,
      raw.track,
      raw.type,
      raw.status,
    );
  }

  async retrieveAll(): Promise<Proposal[]> {
    const knex = this.em.getKnex();
    const result = await knex.select('*').from('proposal_entity');
    return result.map((raw) => {
      return Proposal.fromRaw(
        raw.id,
        raw.title,
        raw.description,
        raw.name,
        raw.surname,
        raw.email,
        raw.event,
        raw.track,
        raw.type,
        raw.status,
      );
    });
  }
}
