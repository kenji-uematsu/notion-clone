import { Request, Response } from 'express';
import Document from '../models/Document';

// Create a new document
export const createDocument = async (req: Request, res: Response) => {
    try {
        const newDocument = new Document(req.body);
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error creating document', error });
    }
};

// Get all documents
export const getDocuments = async (req: Request, res: Response) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error });
    }
};

// Get a document by ID
export const getDocumentById = async (req: Request, res: Response) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document', error });
    }
};

// Update a document by ID
export const updateDocument = async (req: Request, res: Response) => {
    try {
        const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDocument) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document', error });
    }
};

// Delete a document by ID
export const deleteDocument = async (req: Request, res: Response) => {
    try {
        const deletedDocument = await Document.findByIdAndDelete(req.params.id);
        if (!deletedDocument) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error });
    }
};