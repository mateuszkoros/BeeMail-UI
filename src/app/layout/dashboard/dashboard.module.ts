import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChatComponent } from './components';
import { StatModule } from '../../shared';
import { DashboardComponent } from './dashboard.component';
import { IntroComponent } from './components/intro/intro.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        NgbTooltipModule,
        DashboardRoutingModule,
        StatModule,
        FormsModule
    ],
    declarations: [
        ChatComponent,
        DashboardComponent,
        IntroComponent
    ]
})
export class DashboardModule {
}
