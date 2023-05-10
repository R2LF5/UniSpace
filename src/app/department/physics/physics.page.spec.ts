import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhysicsPage } from './physics.page';

describe('PhysicsPage', () => {
  let component: PhysicsPage;
  let fixture: ComponentFixture<PhysicsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PhysicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
