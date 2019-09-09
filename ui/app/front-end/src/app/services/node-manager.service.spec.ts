import { TestBed } from '@angular/core/testing';

import { NodeManagerService } from './node-manager.service';

describe('NodeManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeManagerService = TestBed.get(NodeManagerService);
    expect(service).toBeTruthy();
  });
});
