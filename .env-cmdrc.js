let commonVars={
    DATABASE_USER:"postgres",
    DATABASE_PASSWORD:"refill",
    DATABASE_PORT:"5435",
    DATABASE_NAME:"myrefill",

    JWT_SECRET:"secretKey",

    ADMIN_PASS:"Admin@123",

    RAZORPAY_KEY:"rzp_test_UCd22bCnRcGQRw",
    RAZORPAY_SECRET:"4toW9G2EaCWgjVmokeT3pWfT",

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