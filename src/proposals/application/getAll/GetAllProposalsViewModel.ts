import { Populable } from '../../domain/Populable';

export class GetAllProposalsViewModel implements Populable {
  public id: string;
  public title: string;
  public author: string;

  toPopulate(): string[] {
    return ['id', 'title', 'name'];
  }
}
