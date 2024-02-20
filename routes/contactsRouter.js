import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from "../decorators/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteStatusSchema } from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsController.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactsController.createContact);

contactsRouter.put("/:id", isValidId, validateBody(updateContactSchema), contactsController.updateContact);

contactsRouter.patch('/:id/favorite', isValidId, validateBody(updateFavoriteStatusSchema), contactsController.updateStatus)

export default contactsRouter;