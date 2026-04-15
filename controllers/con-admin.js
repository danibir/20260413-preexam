const Report = require('../models/mod-report')
const Signkey = require('../models/mod-signkey')
const han = require('../handlers/han-mod')
const cons = require('../js/constant')


const index_get = async (req, res) => {
    try {
        const query = req.query
        let querytags = query["tags[]"]

        

        if (!querytags){
            querytags = cons.reportTags.filter(item => item !== "søppelpost")
        }
        let reports = await Report.find({ $or: [ 
            {tags: { $in: querytags } },   
            {tags: { $size: 0 } }
        ]})

        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        const tagcount = Object.fromEntries(cons.reportTags.map(t => [t, 0]))
        for (const report of reports) {
            console.log(!report.createdAt)
            console.log(new Date(report.createdAt) < oneMonthAgo)
            if (!report.createdAt || new Date(report.createdAt) < oneMonthAgo) {
                for (const tag of report.tags) {
                    if (tagcount[tag] !== undefined) {
                        tagcount[tag]++
                    }
                }
            }
        }
        if (!querytags.includes('søppelpost')) reports = reports.filter(item => !item.tags.includes('søppelpost'))
        if (querytags.includes('søppelpost')) reports = reports.filter(item => item.tags.includes('søppelpost'))

        reports = reports.sort((itemA, itemB) => {
            const aHasTags = (itemA.tags && itemA.tags.length > 0)
            const bHasTags = (itemB.tags && itemB.tags.length > 0)
            if (!aHasTags && bHasTags) return 1
            if (aHasTags && !bHasTags) return -1

            if (itemA.status != itemB.status) return itemA.status - itemB.status

            const aImportant = aHasTags && itemA.tags.includes("haster")
            const bImportant = bHasTags && itemB.tags.includes("haster")
            if (aImportant && !bImportant) return -1
            if (!aImportant && bImportant) return 1

            return 0
        })
        for(const report of reports)
        {
            const maxlength = 12
            if (report.title.length > maxlength) report.title = `${report.title.slice(0, maxlength)}...`   
        }
        res.render('admin', { reports, tags: cons.reportTags, pretags: querytags, tagcount })
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', { error: "Server error" })
    }
}
const createkey_get = (req, res) => {
    res.render('keycreate')
}
const createkey_post = async (req, res) => {
    const username = req.body.username
    const isAdmin = req.body.isAdmin == "on"
    const key = await han.generateKey(username, isAdmin, req.user)
    res.render('keygen', { key: key, user: username })
}

module.exports = {
    index_get,
    createkey_get,
    createkey_post
}