import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniNewsPage } from './uni-news.page';

describe('UniNewsPage', () => {
  let component: UniNewsPage;
  let fixture: ComponentFixture<UniNewsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UniNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
