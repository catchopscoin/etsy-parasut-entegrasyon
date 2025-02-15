"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const error = {
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
exports.default = errorHandler;
