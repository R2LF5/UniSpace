import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeologyPage } from './geology.page';

describe('GeologyPage', () => {
  let component: GeologyPage;
  let fixture: ComponentFixture<GeologyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
