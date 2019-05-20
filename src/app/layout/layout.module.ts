import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { GetAddressesService } from '../services/get-addresses.service';
import { ThreadChangeService } from '../services/thread-change.service';
import { SendMailService } from '../services/send-mail.service';
import { DeleteMailService } from '../services/delete-mail.service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NgbDropdownModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent],
    providers: [
        GetAddressesService,
        ThreadChangeService,
        SendMailService,
        DeleteMailService
    ]
})
export class LayoutModule {
}
