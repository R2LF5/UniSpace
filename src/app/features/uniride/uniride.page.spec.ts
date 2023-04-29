import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniridePage } from './uniride.page';

describe('UniridePage', () => {
  let component: UniridePage;
  let fixture: ComponentFixture<UniridePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UniridePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
