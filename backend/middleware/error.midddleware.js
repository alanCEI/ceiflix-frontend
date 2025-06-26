/**
 *      Not Found Route Handler Middleware
 * 
 *  This middleware catches all requests to undefined routes.
 *  It creates a new `Error` object with a 404 message and forwards it
 *  to the error-handling middleware using `next(error)`.
 */

export const notFoundHandler = (req,res, next) => {
    const error = new Error("404 route not found")
    res.status(404);
    next(error);
}

/**
 *      Global Error Handler Middleware
 * 
 *  This middleware handles any error passed via `next(error)`.
 *  It sets the appropriate status code and returns a JSON response with:
 *  - `status`: "error"
 *  - `msg`: the error message
 *  - `stack`: the error stack trace (only in non-production environments)
 */

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: "error",
        msg: err.message,
        stack: process.env.NODE_ENV !== "production" ? "": err.stack
    })
    next();
}