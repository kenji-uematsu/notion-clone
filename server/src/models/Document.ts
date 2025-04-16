import { Schema, model, Document as MongooseDocument } from 'mongoose';

export interface IDocument extends MongooseDocument {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

DocumentSchema.pre<IDocument>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Document = model<IDocument>('Document', DocumentSchema);

export default Document;