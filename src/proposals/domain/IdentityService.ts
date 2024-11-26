export interface IdentityService {
  create(): string;
}

export const IDENTITY_SERVICE = Symbol('IdentityService');
