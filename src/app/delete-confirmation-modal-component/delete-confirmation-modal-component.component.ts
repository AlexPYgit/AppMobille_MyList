import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-delete-confirmation-modal-component',
  templateUrl: './delete-confirmation-modal-component.component.html',
  styleUrls: ['./delete-confirmation-modal-component.component.scss'],
})
export class DeleteConfirmationModalComponentComponent implements OnInit {

  @Input() articleId: number | undefined;

  constructor(private modalController: ModalController, private toastController: ToastController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  confirmDelete() {
    this.modalController.dismiss({ confirmDelete: true });
  }

  cancelDelete() {
    this.modalController.dismiss({ confirmDelete: false });
  }

   /**
   * Manage to toast 
   */
   async presentToast(position: 'top' | 'middle' | 'bottom', action : string) {
    const toast = await this.toastController.create({
      message: `Article ${action} la liste`,
      duration: 1500,
      position: position,
      color : "success",
    });
    await toast.present();
  }
}
