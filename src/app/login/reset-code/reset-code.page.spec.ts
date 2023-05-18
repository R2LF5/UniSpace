import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetCodePage } from './reset-code.page';

describe('ResetCodePage', () => {
  let component: ResetCodePage;
  let fixture: ComponentFixture<ResetCodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResetCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
