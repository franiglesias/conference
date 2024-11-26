import { ulid } from 'ulidx';
import { IdentityService } from '../domain/IdentityService';

export class UlidIdentityService implements IdentityService {
  create() {
    return ulid().toString();
  }
}
