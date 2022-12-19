import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

const routes = express();
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));
routes.use(cors());

routes.get("/", cors(corsOptions), async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

routes.get("/jobs", cors(corsOptions), async (req: Request, res: Response) => {
  const response = await axios.post("https://www.zippia.com/api/jobs/", {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  });
  res.send(response.data).status(200);
});

export default routes;
