import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkspace extends Document {
    name: string;
    owner: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const WorkspaceSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

export default mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);