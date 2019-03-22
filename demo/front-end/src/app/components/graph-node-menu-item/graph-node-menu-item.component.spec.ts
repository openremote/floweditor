import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNodeMenuItemComponent } from './graph-node-menu-item.component';

describe('GraphNodeMenuItemComponent', () => {
  let component: GraphNodeMenuItemComponent;
  let fixture: ComponentFixture<GraphNodeMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphNodeMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphNodeMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
