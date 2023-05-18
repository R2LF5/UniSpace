import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCalanderPage } from './my-calander.page';

describe('MyCalanderPage', () => {
  let component: MyCalanderPage;
  let fixture: ComponentFixture<MyCalanderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyCalanderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
