import { Router } from "express";
import SessionsController from "./controllers/SessionsController";

const sessionsController = new SessionsController();
const sessionsRoutes = Router();

sessionsRoutes.post('/', sessionsController.create);
sessionsRoutes.delete('/', sessionsController.delete); 
sessionsRoutes.get('/', (req, res) => {
  const cookies = req.cookies;
  if (!cookies.user_token) {
    return res.status(401).json({ authenticated: false })
  }
  return res.json({ authenticated: true });
})

export default sessionsRoutes;