import mongoose, { Schema, Document } from 'mongoose';

export type FileChunk = {
    text: string;
    embedding: number[];
};

export type FileDoc = {
    name: string;
    type: string;
    size: number;
    path: string;
    metadata?: Record<string, string | number>;
    conversation_id: mongoose.Types.ObjectId;
    chunks: FileChunk[];
    created_at: Date;
} & Document;

const fileChunkSchema = new Schema<FileChunk>(
    {
        text: { type: String, required: true },
        embedding: { type: [Number], required: true },
    },
    { _id: false }
);

const fileSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        size: { type: Number, required: true },
        path: { type: String, required: true },
        metadata: { type: Schema.Types.Mixed },
        conversation_id: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
        chunks: [fileChunkSchema],
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: false },
    }
);

export const File = mongoose.model<FileDoc>('File', fileSchema);
