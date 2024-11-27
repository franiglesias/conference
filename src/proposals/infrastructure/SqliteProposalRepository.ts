import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { ProposalRepository } from '../domain/ProposalRepository';
import { Proposal } from '../domain/Proposal';

@Injectable()
export class SqliteProposalRepository implements ProposalRepository {
  constructor(@Inject() private readonly em: EntityManager) {}

  async create(
    id: string,
    title: string,
    description: string,
    author: string,
    email: string,
    event: string,
    track: string,
  ): Promise<void> {
    // This call should await the result of the insert operation
    const knex = this.em.getKnex();
    // Columns are defined as not null, so that's why I'm passing all the fields
    await knex
      .insert({
        id: id,
        title: title,
        description: description,
        author: author,
        email: email,
        event: event,
        track: track,
        type: 'TBD',
        status: 'draft',
        created_at: new Date(),
        updated_at: new Date(),
      })
      .into('proposal_entity');
    return Promise.resolve();
  }

  async retrieve(id: string): Promise<Proposal> {
    const knex = this.em.getKnex();

    const result = await knex
      .select('*')
      .from('proposal_entity')
      .where({ id })
      .first();

    if (!result) {
      throw new Error('Proposal not found');
    }
    return new Proposal(
      result.id,
      result.title,
      result.description,
      result.author,
      result.email,
      result.event,
      result.track,
      result.type,
    );
  }

  async retrieveAll(): Promise<Proposal[]> {
    const knex = this.em.getKnex();
    const result = await knex.select('*').from('proposal_entity');
    return result.map((proposal) => {
      return new Proposal(
        proposal.id,
        proposal.title,
        proposal.description,
        proposal.author,
        proposal.email,
        proposal.event,
        proposal.track,
        proposal.type,
      );
    });
  }
}
