import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateProposalDto } from './CreateProposalDto';
import { Proposal } from '../domain/Proposal';
import {
  PROPOSAL_REPOSITORY,
  ProposalRepository,
} from '../domain/ProposalRepository';

@Controller('proposals')
export class ProposalsController {
  constructor(
    @Inject(PROPOSAL_REPOSITORY) private readonly proposals: ProposalRepository,
  ) {}

  @Post()
  create(@Body() createProposal: CreateProposalDto) {
    this.proposals.create(
      createProposal.title,
      createProposal.description,
      createProposal.author,
    );
  }

  @Get()
  findAll(): Proposal[] {
    return this.proposals.retrieveAll();
  }

  @Get(':id')
  findOne(@Param() params: any): Proposal {
    // For route params. Param is represented with :paramName
    // You will find them in the params object params.paramName
    // We need to cast this because TS accepts it as a string even if typed as number
    return this.proposals.retrieve(Number(params.id));
  }
}
