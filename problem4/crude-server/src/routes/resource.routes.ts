import express, { Router } from "express";
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} from "../controllers/resource.controller";

const router: Router = express.Router();

router.post("/", createResource as express.RequestHandler);
router.get("/", getResources as express.RequestHandler);
router.get("/:id", getResourceById as express.RequestHandler);
router.put("/:id", updateResource as express.RequestHandler);
router.delete("/:id", deleteResource as express.RequestHandler);

export default router;
