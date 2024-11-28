export class CreateProposalCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly event: string,
    public readonly track: string,
    public readonly type: string,
  ) {}
}
