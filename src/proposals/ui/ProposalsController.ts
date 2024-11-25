import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateProposalDto } from './CreateProposalDto';
import { Proposal } from '../domain/Proposal';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../domain/ProposalRepository';
import { CreateProposalCommand } from '../application/CreateProposalCommand';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllProposalsQuery } from '../application/GetAllProposalsQuery';
import { GetOneProposalQuery } from '../application/GetOneProposalQuery';

@Controller('proposals')
export class ProposalsController {
  constructor(
    @Inject(PROPOSAL_REPOSITORY) private readonly proposals: ProposalRepository,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createProposal: CreateProposalDto) {
    const command = new CreateProposalCommand(
      createProposal.title,
      createProposal.description,
      createProposal.author,
    );
    return this.commandBus.execute(command);
  }

  @Get()
  async findAll(): Promise<Proposal[]> {
    const query = new GetAllProposalsQuery();
    return await this.queryBus.execute(query);
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<Proposal> {
    // For route params. Param is represented with :paramName
    // You will find them in the params object params.paramName
    // We need to cast this because TS accepts it as a string even if typed as number
    const query = new GetOneProposalQuery(Number(params.id));
    return await this.queryBus.execute(query);
  }
}
