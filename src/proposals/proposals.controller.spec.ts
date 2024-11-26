import { Test, TestingModule } from '@nestjs/testing';
import { ProposalsController } from './ui/ProposalsController';

import { MemoryProposalRepository } from './infrastructure/MemoryProposalRepository';
import { CreateProposalDto } from './ui/CreateProposalDto';
import { PROPOSAL_REPOSITORY } from './domain/ProposalRepository';
import { IDENTITY_SERVICE } from './domain/IdentityService';

import * as httpMocks from 'node-mocks-http';
import { PresetIdentityService } from './infrastructure/PresetIdentityService';
import { ProposalModule } from './ProposalModule';

describe('ProposalsController', () => {
  let proposalController: ProposalsController;
  let proposalRepository: MemoryProposalRepository;

  const DUMMY_ID = '01JDM4S4RBX4QK3054YXT16V2X';

  beforeEach(async () => {
    // This allows creating a module for this test context
    // In providers I can define the services that I want to use
    // In this case, I'm importing the whole Module.
    // and override the IdentityService provider with a deterministic one
    // That have a preset value for the identity
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProposalModule],
    })
      .overrideProvider(IDENTITY_SERVICE) // Specify the provider you want to replace
      .useValue(new PresetIdentityService(DUMMY_ID)) // Replace Provider with an instance in testing environment
      .compile();

    // I think you should initialize the module to make sure that all the services are created
    // At least, if the test is "more than unitary". Otherwise, handlers seem to be unreachable
    await module.init();

    // Now I can require the instances of the controller and services I need to interact with during the test
    proposalController = module.get<ProposalsController>(ProposalsController);
    // I require the repository to check if things are created as expected
    proposalRepository =
      module.get<MemoryProposalRepository>(PROPOSAL_REPOSITORY);
  });

  it('should be defined', () => {
    // This in a simple test to check that the controller is defined
    // It is nice, but it is not really useful if you have another tests in place
    // that uses the object
    expect(proposalController).toBeDefined();
  });

  it('should be able to add a new proposal', async () => {
    // This works... I'm not sure is what I want to do, but it works
    // this allows an anonymous struct to be cast as CreateProposalDto
    // which is nice for mocking things. But we should not mock DTOs
    // AFAIK, I can pass a dto with the same properties as the CreateProposalDto
    // but not being itself a CreateProposalDto (need to recheck this)
    // Basically this is similar to a discovered interface (Go style)
    const dto = {
      title: 'The dos a do nots of modern development',
      description: 'The do a do not of modern development',
      author: 'fran@example.com',
    } as CreateProposalDto;
    // Mock a Response object that can possible work with the controller
    const res = httpMocks.createResponse();
    await proposalController.create(dto, res);
    // Now, I can check in the backend repository to see is a proposal was created
    expect(proposalRepository.retrieveAll()).toHaveLength(1);
    // And I can check the response to see if the location header is set with the correct value
    expect(res.getHeader('Location')).toBe(`/proposals/${DUMMY_ID}`);
  });

  it('should get all proposals that exist in the repository', async () => {
    proposalRepository.create(
      '101JDM54WZC452N81R457S38HCV',
      'New visions on validation',
      'This is a proposal example of a talk',
      'fran@example.com',
    );
    proposalRepository.create(
      '01JDM556R7ZTXHQVH3T87S460Z',
      'The future of the web',
      'This is a proposal example of a talk',
      'pepe@example.com',
    );

    expect(await proposalController.findAll()).toHaveLength(2);
  });
});
