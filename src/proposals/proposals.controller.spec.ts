import { Test, TestingModule } from '@nestjs/testing';
import { ProposalsController } from './ui/ProposalsController';

import { MemoryProposalRepository } from './infrastructure/MemoryProposalRepository';
import { CreateProposalDto } from './ui/CreateProposalDto';
import { CqrsModule } from '@nestjs/cqrs';
import { PROPOSAL_REPOSITORY } from './domain/ProposalRepository';
import { CreateProposalHandler } from './application/CreateProposalHandler';
import { GetAllProposalsHandler } from './application/GetAllProposalsHandler';
import { IDENTITY_SERVICE } from './domain/IdentityService';
import { UlidIdentityService } from './infrastructure/UlidIdentityService';
import { GetOneProposalHandler } from './application/GetOneProposalHandler';

describe('ProposalsController', () => {
  let proposalController: ProposalsController;
  let proposalRepository: MemoryProposalRepository;

  beforeEach(async () => {
    // This allows to create a module for this test context
    // In providers I can define the services that I want to use
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [ProposalsController],
      providers: [
        CreateProposalHandler,
        GetAllProposalsHandler,
        GetOneProposalHandler,
        {
          provide: PROPOSAL_REPOSITORY,
          useClass: MemoryProposalRepository,
        },
        {
          provide: IDENTITY_SERVICE,
          useClass: UlidIdentityService,
        },
      ],
    }).compile();
    // I think you should init the module to make sure that all the services are created
    // At least, if the test is "more than unitary"
    await module.init();

    // Now I can require the instances of the controller and services I want in the test
    proposalController = module.get<ProposalsController>(ProposalsController);
    proposalRepository =
      module.get<MemoryProposalRepository>(PROPOSAL_REPOSITORY);
  });

  it('should be defined', () => {
    // This in a simple test to check that the controller is defined
    // It is nice, but it is not really useful if you have another tests in place
    // that uses the object
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
    // In fact, I can check the content of the proposal
    expect(proposalRepository.retrieveAll()).toHaveLength(1);
  });

  it('should get all proposals that exists in the repository', async () => {
    proposalRepository.create(
      '1',
      'New visions on validation',
      'This is a proposal example of a talk',
      'fran@example.com',
    );
    proposalRepository.create(
      '2',
      'The future of the web',
      'This is a proposal example of a talk',
      'pepe@example.com',
    );

    expect(await proposalController.findAll()).toHaveLength(2);
  });
});
