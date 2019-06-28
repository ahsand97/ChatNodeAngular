import { TestBed } from '@angular/core/testing';

import { ComunidadesService } from './comunidades.service';

describe('ComunidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComunidadesService = TestBed.get(ComunidadesService);
    expect(service).toBeTruthy();
  });
});
