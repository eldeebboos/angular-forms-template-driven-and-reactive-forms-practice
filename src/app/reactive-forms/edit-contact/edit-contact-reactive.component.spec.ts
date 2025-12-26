import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactReactiveComponent } from './edit-contact-reactive.component';

describe('EditContactReactiveComponent', () => {
  let component: EditContactReactiveComponent;
  let fixture: ComponentFixture<EditContactReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContactReactiveComponent],
    });
    fixture = TestBed.createComponent(EditContactReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
