import { IdentityService } from '../../domain/IdentityService';

export class PresetIdentityService implements IdentityService {
  constructor(private readonly id: string) {}

  create(): string {
    return this.id;
  }
}
