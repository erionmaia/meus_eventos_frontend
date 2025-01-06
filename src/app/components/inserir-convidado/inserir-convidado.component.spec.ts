import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirConvidadoComponent } from './inserir-convidado.component';

describe('InserirConvidadoComponent', () => {
  let component: InserirConvidadoComponent;
  let fixture: ComponentFixture<InserirConvidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirConvidadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirConvidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
