import express from 'express';
const router = express.Router();
import { getMoviesNowPlaying, watchedMovie, getMovieById, getWatchedMovies } from '../controllers/movies.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

router.get("/me", authMiddleware, getWatchedMovies);
router.get("/nowplaying", getMoviesNowPlaying);
router.post("/", authMiddleware, watchedMovie);
router.get("/:id", getMovieById);


export default router;