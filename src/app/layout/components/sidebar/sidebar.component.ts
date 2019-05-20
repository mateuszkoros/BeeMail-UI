import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GetAddressesService } from '../../../services/get-addresses.service';
import { ThreadChangeService } from '../../../services/thread-change.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    currentAddress: string;
    addresses: string[];
    addressesSubscription: Subscription;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router: Router, private getAddressesService: GetAddressesService, private threadChangeService: ThreadChangeService,
                private toastr: ToastrService) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.getAddressesService.getAllAddresses().subscribe(
            addresses => this.addresses = addresses,
            err => {
                this.toastr.error(err, 'Failed to get addresses');
                console.log(err);
            }
        );
        this.addressesSubscription = this.threadChangeService.change.subscribe(
            address => {
                if (address && !this.addresses.includes(address)) {
                    this.addresses.push(address);
                }
                this.currentAddress = address;
            });
    }

    ngOnDestroy() {
        this.addressesSubscription.unsubscribe();
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeThread(address: string) {
        this.threadChangeService.changeThread(address);
    }
}
