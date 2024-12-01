import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { GetAllProposalsViewModel } from '../application/getAll/GetAllProposalsViewModel';
import { AllProposals } from '../application/getAll/AllProposals';

@Injectable()
export class SqliteReadGetAllProposals implements AllProposals {
  constructor(@Inject() private readonly em: EntityManager) {}

  async read(): Promise<GetAllProposalsViewModel[]> {
    const knex = this.em.getKnex();
    const result = await knex
      .select(
        'id',
        'title',
        knex.raw('CONCAT(name, \' \', surname) as "author"'), // How to pass calculated fields
      )
      .from('proposal_entity');
    return result.map((raw) => {
      // You can populate an object with public properties this way, without the need to use a constructor
      return {
        id: raw.id,
        title: raw.title,
        author: raw.author,
      } as GetAllProposalsViewModel;
    });
  }
}
