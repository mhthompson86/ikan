import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTypeMenuComponent } from './issue-type-menu.component';

describe('IssueTypeMenuComponent', () => {
  let component: IssueTypeMenuComponent;
  let fixture: ComponentFixture<IssueTypeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTypeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTypeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
