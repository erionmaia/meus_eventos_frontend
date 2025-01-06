import { TestBed } from '@angular/core/testing';

import { ConvidadosService } from './convidados.service';

describe('ConvidadosService', () => {
  let service: ConvidadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvidadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
