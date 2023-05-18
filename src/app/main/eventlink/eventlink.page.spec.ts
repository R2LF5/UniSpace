import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventlinkPage } from './eventlink.page';

describe('EventlinkPage', () => {
  let component: EventlinkPage;
  let fixture: ComponentFixture<EventlinkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventlinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
