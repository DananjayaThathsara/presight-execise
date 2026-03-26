import { Router } from "express";
import { getPeople } from "./people.service";
import { PeopleQuery } from "../../types";

// Create a new router for people-related routes
export const peopleRouter = Router();

// Define the GET /api/people route to fetch people data with pagination, search, and filters
peopleRouter.get("/people", (req, res) => {
  const query = req.query as PeopleQuery;
  const result = getPeople(query);
  res.json(result);
});
