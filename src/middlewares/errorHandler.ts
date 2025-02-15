import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
    message: string;
    stack?: string;
    status: number;
}

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error: ErrorResponse = {
        message: err.message || 'Sunucu Hatası',
        status: 500
    };

    if (process.env.NODE_ENV === 'development') {
        error.stack = err.stack;
    }

    res.status(error.status).json({
        success: false,
        error: error
    });
};

export default errorHandler; 