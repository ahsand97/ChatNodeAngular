import { TestBed } from '@angular/core/testing';

import { EliminarcuentaService } from './eliminarcuenta.service';

describe('EliminarcuentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EliminarcuentaService = TestBed.get(EliminarcuentaService);
    expect(service).toBeTruthy();
  });
});
