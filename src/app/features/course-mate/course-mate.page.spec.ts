import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseMatePage } from './course-mate.page';

describe('CourseMatePage', () => {
  let component: CourseMatePage;
  let fixture: ComponentFixture<CourseMatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CourseMatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
