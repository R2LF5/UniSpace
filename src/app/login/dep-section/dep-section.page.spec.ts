import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepSectionPage } from './dep-section.page';

describe('DepSectionPage', () => {
  let component: DepSectionPage;
  let fixture: ComponentFixture<DepSectionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DepSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
