// src/app/shared/models/reply.model.ts

export class Reply {
    id: number;               // Unique identifier for the reply
    message: string;          // The content of the reply
    ticketId: number;         // Associated ticket ID
    userId: number;           // ID of the user who created the reply
    createdAt: Date;          // Timestamp for when the reply was created
    updatedAt: Date;          // Timestamp for when the reply was last updated
    attachments?: Attachment[]; // Optional attachments

    constructor(id: number, message: string, ticketId: number, userId: number, createdAt: Date, updatedAt: Date, attachments: Attachment[] = []) {
        this.id = id;
        this.message = message;
        this.ticketId = ticketId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.attachments = attachments;
    }
}

export class Attachment {
    id: number;           // Unique identifier for the attachment
    filename: string;     // Original name of the file
    fileType: string;     // File type or extension (e.g., 'jpg', 'pdf')
    fileSize: number;     // Size of the file in bytes
    fileUrl: string;      // URL to access/download the file
    uploadedBy: number;   // ID of the user who uploaded the file
    uploadedAt: Date;     // Timestamp for when the file was uploaded

    constructor(id: number, filename: string, fileType: string, fileSize: number, fileUrl: string, uploadedBy: number, uploadedAt: Date) {
        this.id = id;
        this.filename = filename;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.fileUrl = fileUrl;
        this.uploadedBy = uploadedBy;
        this.uploadedAt = uploadedAt;
    }
}