import { TestBed } from '@angular/core/testing';

import { StrEncryptionService } from './str.encryption.service';

describe('Str.EncryptionService', () => {
  let service: StrEncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Str.EncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
