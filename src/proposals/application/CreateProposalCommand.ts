export class CreateProposalCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly author: string,
  ) {}
}
