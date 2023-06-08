import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindridePage } from './findride.page';

describe('FindridePage', () => {
  let component: FindridePage;
  let fixture: ComponentFixture<FindridePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindridePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
