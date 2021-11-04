module.exports = {
    mongoUrl: process.env.MONGODB_URI || "mongodb+srv://thangtran:thangtran@illuminate-ecommerce.vkylh.mongodb.net/illuminate-ecommerce?retryWrites=true&w=majority\n",

    jwtSecret: process.env.JWT_SECRET || "12aUhnc_tjGEyGb_UcLdmkGNUnSQkO7l3Pp2plhjIbgWJsriDEruemDj0ZCGbpQl",
    jwtExpiresIn: 3600,

    logs: process.env.NODE_ENV === "production" ? "combined" : "dev",

    mailConfigs: {
        admin: {
            name: "admin",
            email: "admin@admin.com",
        },
        confirmEmails: {
            from: "no-reply@test-app.com",
        },
    },
    mailchimpConfigs: {
        apiKey: process.env.MAILCHIMP_APIKEY,
        listsId: process.env.MAILCHIMP_LISTID,
    },
};
