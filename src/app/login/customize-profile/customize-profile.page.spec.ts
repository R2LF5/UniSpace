import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomizeProfilePage } from './customize-profile.page';

describe('CustomizeProfilePage', () => {
  let component: CustomizeProfilePage;
  let fixture: ComponentFixture<CustomizeProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomizeProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
