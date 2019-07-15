import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambioCiudadComponent } from './dialog-cambio-ciudad.component';

describe('DialogCambioCiudadComponent', () => {
  let component: DialogCambioCiudadComponent;
  let fixture: ComponentFixture<DialogCambioCiudadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCambioCiudadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCambioCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
