import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteConfirmationModalComponentComponent } from './delete-confirmation-modal-component.component';

describe('DeleteConfirmationModalComponentComponent', () => {
  let component: DeleteConfirmationModalComponentComponent;
  let fixture: ComponentFixture<DeleteConfirmationModalComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationModalComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
