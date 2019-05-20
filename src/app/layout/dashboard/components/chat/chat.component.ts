import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThreadChangeService } from '../../../../services/thread-change.service';
import { GetMailsService } from '../../../../services/get-mails.service';
import { flatMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MailType, Message } from '../../../../models/message';
import { SendMailService } from '../../../../services/send-mail.service';
import { DeleteMailService } from '../../../../services/delete-mail.service';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    currentAddress;
    messages = new Array<Message>();
    messagesSubscription: Subscription;
    attachment: string;

    constructor(private threadChangeService: ThreadChangeService, private getMailsService: GetMailsService,
                private sendMailService: SendMailService, private deleteMailService: DeleteMailService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.messagesSubscription = this.threadChangeService.change
            .pipe(
                flatMap(address => this.getMailsByAddress(address))
            )
            .subscribe(
                messages => {
                this.displayMails(messages);
            },
                error => {
                    this.toastr.error(error, 'Failed to get messages');
                    console.log(error);
                });
    }

    ngOnDestroy() {
        this.messagesSubscription.unsubscribe();
    }

    getMailsByAddress(address: string): Observable<Message[]> {
        this.currentAddress = address;
        return this.getMailsService.getAllMailsWithAddress(this.currentAddress);
    }

    refreshMails() {
        this.getMailsService.getAllMailsWithAddress(this.currentAddress).subscribe(messages => this.displayMails(messages));
    }

    displayMails(messages: Message[]) {
        this.messages = new Array<Message>();
        for (const message of messages) {
            this.messages = this.messages.concat(new Message(message));
        }
    }

    sendMessage(form) {
        const messageObject = {
            subject: form.subject.value,
            message: form.message.value,
            remoteaddress: this.currentAddress
        };
        const newMessage = new Message(messageObject);
        this.sendMailService.sendMail(newMessage).subscribe(
            response => {
            if (response.response === 'OK') {
                newMessage.type = MailType.Outgoing;
                newMessage.timestamp = new Date();
                newMessage.message = newMessage.message.trim();
                this.messages = this.messages.concat(newMessage);
            } else {
                this.toastr.error(response.response, 'Failed to send message');
                console.log(response);
            }
        },
            error => {
                this.toastr.error(error, 'Failed to send message');
                console.log(error);
            });
    }

    deleteMessage(message: Message) {
        this.deleteMailService.deleteMessage(message.id).subscribe(
            response => {
                if (response.response === 'OK') {
                    const index: number = this.messages.indexOf(message, 0);
                    if (index > -1) {
                        this.messages.splice(index, 1);
                    }
                } else {
                    this.toastr.error(response.response, 'Failed to delete message');
                    console.log(response);
                }
            },
            error => {
                this.toastr.error(error, 'Failed to delete message');
                console.log(error);
            }
        );
    }

    onFileChange(event) {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.attachment = reader.result.toString().split(',')[1];
                console.log(this.attachment);
            };
        }
    }

    downloadAttachment(message: Message) {
        const byteString = window.atob(message.attachment);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array]);
        saveAs(blob, message.attachmentName);
    }
}
