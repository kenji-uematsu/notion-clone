import { Router } from "express";
import {
  createWorkspace,
  getWorkspaces,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspaceController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Create a new workspace
router.post("/", authenticateToken, createWorkspace);

// Get all workspaces
router.get("/", authenticateToken, getWorkspaces);

// Update a workspace
router.put("/:id", authenticateToken, updateWorkspace);

// Delete a workspace
router.delete("/:id", authenticateToken, deleteWorkspace);

export default router;
