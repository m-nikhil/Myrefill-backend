let commonVars={
    DATABASE_USER:"postgres",
    DATABASE_PASSWORD:"refill",
    DATABASE_PORT:"5435",
    DATABASE_NAME:"myrefill",

    JWT_SECRET:"secretKey",

    ADMIN_PASS:"Admin@123",

    RAZORPAY_KEY:"rzp_test_PnGX1hQCb6eAMl",
    RAZORPAY_SECRET:"PoyrmOYQFLBGHmo3Lt0UyiGG",

    AWS_SES_ACCESS_KEY_ID:"AKIAJAT5ERHY2UMZS4LQ",
    AWS_SES_SECRET_ACCESS_KEY:"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",

    PRICE_PER_HALF_LITRE:3
}
exports.development={
    "NODE_ENV":"development",
    "FRONTEND_URL":"",
    "DATABASE_HOST":"localhost",
    ...commonVars
}
exports.production={
    "NODE_ENV":"production",
    "FRONTEND_URL":"",
    "DATABASE_HOST":"139.59.35.136",
    ...commonVars
}
exports.local={
    "NODE_ENV":"local",
    "FRONTEND_URL":"http://localhost:3000",
    "DATABASE_HOST":"localhost",
    ...commonVars
}