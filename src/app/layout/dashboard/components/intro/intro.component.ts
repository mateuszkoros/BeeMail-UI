import { Component, OnInit } from '@angular/core';
import { ThreadChangeService } from '../../../../services/thread-change.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private threadChangeService: ThreadChangeService) { }

  ngOnInit() {
  }

  addNewAddress(newAddressForm) {
    this.threadChangeService.changeThread(newAddressForm.address.value);
  }

}
