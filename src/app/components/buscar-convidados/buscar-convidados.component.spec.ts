import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarConvidadosComponent } from './buscar-convidados.component';

describe('BuscarConvidadosComponent', () => {
  let component: BuscarConvidadosComponent;
  let fixture: ComponentFixture<BuscarConvidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarConvidadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarConvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
