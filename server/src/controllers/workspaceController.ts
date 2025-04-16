import { Request, Response } from 'express';
import Workspace from '../models/Workspace';

// ワークスペースの作成
export const createWorkspace = async (req: Request, res: Response) => {
    try {
        const { name, userId } = req.body;
        const newWorkspace = new Workspace({ name, userId });
        await newWorkspace.save();
        res.status(201).json(newWorkspace);
    } catch (error) {
        res.status(500).json({ message: 'Error creating workspace', error });
    }
};

// ワークスペースの取得
export const getWorkspaces = async (req: Request, res: Response) => {
    try {
        const workspaces = await Workspace.find({ userId: req.params.userId });
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workspaces', error });
    }
};

// ワークスペースの更新
export const updateWorkspace = async (req: Request, res: Response) => {
    try {
        const { workspaceId } = req.params;
        const updatedWorkspace = await Workspace.findByIdAndUpdate(workspaceId, req.body, { new: true });
        res.status(200).json(updatedWorkspace);
    } catch (error) {
        res.status(500).json({ message: 'Error updating workspace', error });
    }
};

// ワークスペースの削除
export const deleteWorkspace = async (req: Request, res: Response) => {
    try {
        const { workspaceId } = req.params;
        await Workspace.findByIdAndDelete(workspaceId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting workspace', error });
    }
};