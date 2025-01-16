import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConfirmadosComponent } from './lista-confirmados.component';

describe('ListaConfirmadosComponent', () => {
  let component: ListaConfirmadosComponent;
  let fixture: ComponentFixture<ListaConfirmadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaConfirmadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConfirmadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
