export const etsyConfig = {
    apiKey: process.env.ETSY_API_KEY || '',
    oauthKey: process.env.ETSY_OAUTH_KEY || '',
    apiSecret: process.env.ETSY_API_SECRET || '',
    baseUrl: 'https://openapi.etsy.com/v3',
    scopes: [
        'listings_r',
        'transactions_r',
        'users_r'
    ],
    callbackUrl: process.env.ETSY_CALLBACK_URL || 'http://localhost:3001/api/etsy/callback'
}; 