import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnirideDesktoopPage } from './uniride-desktoop.page';

describe('UnirideDesktoopPage', () => {
  let component: UnirideDesktoopPage;
  let fixture: ComponentFixture<UnirideDesktoopPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UnirideDesktoopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
