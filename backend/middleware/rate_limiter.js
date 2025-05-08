import rateLimit from 'express-rate-limit'

export const signupLimiter = rateLimit({
    // 5 max per 15mins
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many signup attempts, please try again later.'},
    standardHeaders: true,
    legacyHeaders: false
})