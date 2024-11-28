import { Entity, PrimaryKey, Property, TextType } from '@mikro-orm/core';

@Entity()
export class ProposalEntity {
  @PrimaryKey()
  id: string;

  @Property()
  title: string;

  @Property({ type: TextType })
  description: string;

  @Property()
  author: string;

  @Property()
  email: string;

  @Property()
  event: string;

  @Property()
  track: string;

  @Property({ default: 'TBD' })
  type: string;

  @Property({ default: 'draft' })
  status: string;

  @Property()
  created_at: Date;

  @Property()
  updated_at: Date;

  @Property({ nullable: true })
  name: string;

  @Property({ nullable: true })
  surname: string;
}
