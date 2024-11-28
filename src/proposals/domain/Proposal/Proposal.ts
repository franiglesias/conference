import { ProposalId } from './ProposalId';
import { ProposalTitle } from './ProposalTitle';
import { ProposalStatus } from './ProposalStatus';
import { ProposalDescription } from './ProposalDescription';
import { AuthorEmail } from './AuthorEmail';
import { AuthorName } from './AuthorName';

export class Proposal {
  private readonly id: ProposalId;
  private readonly title: ProposalTitle;
  private readonly description: ProposalDescription;
  private readonly author: AuthorName;
  private readonly email: AuthorEmail;
  private readonly event: string;
  private readonly track: string;
  private readonly format: string;
  private readonly status: ProposalStatus;

  private constructor(
    id: ProposalId,
    title: ProposalTitle,
    description: ProposalDescription,
    author: AuthorName,
    email: AuthorEmail,
    event: string,
    track: string,
    format: string,
    status: ProposalStatus,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.email = email;
    this.event = event;
    this.track = track;
    this.format = format;
    this.status = status;
  }

  public static fromRaw(
    id: string,
    title: string,
    description: string,
    author: string,
    email: string,
    event: string,
    track: string,
    type: string,
    status: string,
  ) {
    return new Proposal(
      new ProposalId(id),
      new ProposalTitle(title),
      new ProposalDescription(description),
      new AuthorName(author, ''),
      new AuthorEmail(email),
      event,
      track,
      type,
      new ProposalStatus(status),
    );
  }

  public static receive(
    id: string,
    title: string,
    description: string,
    author: string,
    email: string,
    event: string,
    track: string,
    type: string,
  ) {
    return new Proposal(
      new ProposalId(id),
      new ProposalTitle(title),
      new ProposalDescription(description),
      new AuthorName(author, ''),
      new AuthorEmail(email),
      event,
      track,
      type,
      new ProposalStatus('draft'),
    );
  }

  isIdentifiedBy(id: string) {
    return this.id === new ProposalId(id);
  }

  mapToRaw() {
    return {
      id: this.id.toString(),
      title: this.title.toString(),
      description: this.description.toString(),
      author: this.author.toString(),
      email: this.email.toString(),
      event: this.event.toString(),
      track: this.track.toString(),
      format: this.format.toString(),
      status: this.status.toString(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
