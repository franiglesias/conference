import { IdentityService } from '../domain/IdentityService';

export class PresetIdentityService implements IdentityService {
  public id: string;
  create(): string {
    return this.id ?? '01JDM4S4RBX4QK3054YXT16V2X';
  }
}
