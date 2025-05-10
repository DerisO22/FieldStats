import rateLimit from 'express-rate-limit'

/**
 * Authentication Limiters
 */
export const signupLimiter = rateLimit({
    // 5 max per 15mins
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many signup attempts, please try again later.'},
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Protected Endpoint Limiters
 */
export const editContentLimiter = rateLimit({
    // 2 per 5 mins
    windowMs: 5 * 60 * 1000,
    max: 2,
    message: { error: 'Too many edit attempts, please try again later.'},
    standardHeaders: true,
    legacyHeaders: false
});

export const addContentLimiter = rateLimit({
    // 1 per 60 mins
    windowMs: 60 * 60 * 1000,
    max: 1,
    message: { error: 'Too many add attempts, please try again later.'},
    standardHeaders: true,
    legacyHeaders: false
});

export const deleteContentLimiter = rateLimit({
    // 1 per 60 mins
    windowMs: 60 * 60 * 1000,
    max: 1,
    message: { error: 'Too many delete attempts, please try again later.'},
    standardHeaders: true,
    legacyHeaders: false
});