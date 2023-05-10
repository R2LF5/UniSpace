import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemistryPage } from './chemistry.page';

describe('ChemistryPage', () => {
  let component: ChemistryPage;
  let fixture: ComponentFixture<ChemistryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChemistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
