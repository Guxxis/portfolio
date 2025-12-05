import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternButton } from './extern-button';

describe('ExternButton', () => {
  let component: ExternButton;
  let fixture: ComponentFixture<ExternButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
