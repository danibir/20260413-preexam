const cron = require("node-cron")
const Report = require("../models/mod-report")

cron.schedule("0 3 * * *", async () => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

        await Report.deleteMany({
            tag: "søppelpost",
            updatedAt: { $lte: oneMonthAgo }
        })

        console.log("Deleted old spam reports")
    } catch (err) {
        console.error("Failed to delete old spam reports:", err);
    }
})