import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { GetAllProposalsViewModel } from '../application/getAll/GetAllProposalsViewModel';
import { ReadGetAllProposals } from '../application/getAll/ReadGetAllProposals';

@Injectable()
export class SqliteReadGetAllProposals implements ReadGetAllProposals {
  constructor(@Inject() private readonly em: EntityManager) {}

  async read(): Promise<GetAllProposalsViewModel[]> {
    const knex = this.em.getKnex();
    const result = await knex.select('*').from('proposal_entity');
    return result.map((raw) => {
      const view = new GetAllProposalsViewModel();
      view.id = raw.id;
      view.title = raw.title;
      view.name = raw.name;
      return view;
    });
  }
}
