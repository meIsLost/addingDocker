import express from "express";
import { createDestination, getAllDestinations } from "../databases/destinationQueries.js";
const router = express.Router();

router.get('/destinations', async (req, res) => {
    try {
      const destinations = await getAllDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  });

router.post('/destinations', async (req, res) => {
    const newDestination = req.body;
    const destination = await createDestination(newDestination);
    res.json({ message: 'Destination has been created:', destination });
});


export default router;