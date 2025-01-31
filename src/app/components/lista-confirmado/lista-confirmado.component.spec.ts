import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConfirmadoComponent } from './lista-confirmado.component';

describe('ListaConfirmadoComponent', () => {
  let component: ListaConfirmadoComponent;
  let fixture: ComponentFixture<ListaConfirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaConfirmadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
