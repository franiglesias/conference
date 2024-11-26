import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateProposalDto } from './CreateProposalDto';
import { Proposal } from '../domain/Proposal';
import { CreateProposalCommand } from '../application/CreateProposalCommand';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllProposalsQuery } from '../application/GetAllProposalsQuery';
import { GetOneProposalQuery } from '../application/GetOneProposalQuery';
import { Response } from 'express';

@Controller('proposals')
export class ProposalsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async create(
    @Body() createProposal: CreateProposalDto,
    @Res() response: Response,
  ): Promise<Response> {
    const command = new CreateProposalCommand(
      createProposal.title,
      createProposal.description,
      createProposal.author,
    );
    const result = await this.commandBus.execute(command);
    return response
      .header('Location', `/proposals/${result}`)
      .status(201)
      .send();
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
    const query = new GetOneProposalQuery(params.id);
    return await this.queryBus.execute(query);
  }
}
