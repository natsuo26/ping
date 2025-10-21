import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBlobComponent } from './message-blob.component';

describe('MessageBlobComponent', () => {
  let component: MessageBlobComponent;
  let fixture: ComponentFixture<MessageBlobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBlobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
