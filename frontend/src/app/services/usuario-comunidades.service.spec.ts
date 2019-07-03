import { TestBed } from '@angular/core/testing';

import { UsuarioComunidadesService } from './usuario-comunidades.service';

describe('UsuarioComunidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioComunidadesService = TestBed.get(UsuarioComunidadesService);
    expect(service).toBeTruthy();
  });
});
