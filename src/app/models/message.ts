export enum MailType {
    Outgoing = 'Outgoing',
    Incoming = 'Incoming'
}

export class Message {
    id: number;
    subject: string;
    message: string;
    type: MailType;
    remoteAddress: string;
    timestamp: Date;
    attachmentName: string;
    attachment: string;

    constructor(object) {
        this.id = object.id;
        this.subject = object.subject;
        this.message = object.message;
        this.type = MailType[<string>object.type];
        this.remoteAddress = object.remoteaddress;
        this.timestamp = new Date(object.timestamp);
        this.attachmentName = object.attachmentname;
        this.attachment = object.attachment;
    }
}
