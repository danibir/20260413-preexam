
const Report = require('../models/mod-report')
const cons = require('../js/constant')


const index_get = async (req, res) => {
    try {
        const query = req.query
        let querytags = query["tags[]"]
        console.log(query)
        if (!querytags){
            querytags = cons.reportTags.filter(item => item !== "søppelpost")
        }
        let reports = await Report.find({ $or: [ 
            {tags: { $in: querytags } },   
            {tags: { $size: 0 } }
        ]})
        if (!querytags.includes('søppelpost')) reports = reports.filter(item => !item.tags.includes('søppelpost'))
        if (querytags.includes('søppelpost')) reports = reports.filter(item => item.tags.includes('søppelpost'))

        reports = reports.sort((itemA, itemB) => {
            const aHasTags = (itemA.tags && itemA.tags.length > 0)
            const bHasTags = (itemB.tags && itemB.tags.length > 0)
            if (!aHasTags && bHasTags) return 1
            if (aHasTags && !bHasTags) return -1

            const aImportant = aHasTags && itemA.tags.includes("haster")
            const bImportant = bHasTags && itemB.tags.includes("haster")
            if (aImportant && !bImportant) return -1
            if (!aImportant && bImportant) return 1

            return itemA.status - itemB.status
        })
        res.render('admin', { reports, tags: cons.reportTags, pretags: querytags })
    } catch (err) {
        console.log(err)
        return res.status(500).render('error', { error: "Server error" })
    }
}

module.exports = {
    index_get
}