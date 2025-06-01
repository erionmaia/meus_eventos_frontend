import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidadosComponent } from './convidados.component';

describe('ConvidadosComponent', () => {
  let component: ConvidadosComponent;
  let fixture: ComponentFixture<ConvidadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvidadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
