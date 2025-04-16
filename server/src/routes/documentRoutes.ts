import { Router } from 'express';
import { createDocument, getDocuments, updateDocument, deleteDocument } from '../controllers/documentController';

const router = Router();

// Create a new document
router.post('/', createDocument);

// Get all documents
router.get('/', getDocuments);

// Update a document by ID
router.put('/:id', updateDocument);

// Delete a document by ID
router.delete('/:id', deleteDocument);

export default router;