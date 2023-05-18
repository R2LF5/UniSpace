import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddpoolPage } from './addpool.page';

describe('AddpoolPage', () => {
  let component: AddpoolPage;
  let fixture: ComponentFixture<AddpoolPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddpoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
