import { Test, TestingModule } from '@nestjs/testing';
import { ProposalsController } from './ui/ProposalsController';

import { MemoryProposalRepository } from './infrastructure/MemoryProposalRepository';
import { CreateProposalDto } from './ui/CreateProposalDto';

describe('ProposalsController', () => {
  let proposalController: ProposalsController;
  let proposalService: MemoryProposalRepository;

  beforeEach(async () => {
    // This allows to create a module for this test context
    // In providers I can define the services that I want to use
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProposalsController],
      providers: [MemoryProposalRepository],
    }).compile();

    // Now I can require the instances of the controller and services I want in the test
    proposalController = module.get<ProposalsController>(ProposalsController);
    proposalService = module.get<MemoryProposalRepository>(MemoryProposalRepository);
  });

  it('should be defined', () => {
    // This in a simple test to check that the controller is defined
    // It is nice, but it is not really useful
    expect(proposalController).toBeDefined();
  });

  it('should be able to add a new proposal', () => {
    // This works... I'm not sure is what I want to do, but it works
    // this allows an anonymous struct to be casted to the CreateProposalDto
    // which is nice for mocking things. But we should not mock DTOs
    const dto = {
      title: 'The dos a do nots of modern development',
      description: 'The do a do not of modern development',
      author: 'fran@example.com',
    } as CreateProposalDto;

    // AFAIK, I can pass a dto with the same properties as the CreateProposalDto
    proposalController.create(dto);
    // Now, I can check in the backend service to see is a proposal was created
    const createdProposal = proposalService.retrieve(1);
    // In fact, I can check the content of the proposal
    expect(createdProposal.isIdentifiedBy(1));
    expect(JSON.stringify(createdProposal)).toEqual(
      `{"id":1,"title":"The dos a do nots of modern development","description":"The do a do not of modern development","author":"fran@example.com"}`,
    );
  });

  it('should get all proposals that exists', () => {
    proposalService.create(
      'New visions on validation',
      'This is a proposal example of a talk',
      'fran@example.com',
    );
    proposalService.create(
      'The future of the web',
      'This is a proposal example of a talk',
      'pepe@example.com',
    );

    expect(proposalService.retrieveAll()).toHaveLength(2);
  });
});
