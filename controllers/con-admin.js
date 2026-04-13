
const Report = require('../models/mod-report')


const index_get = async (req, res) => {
    const reports = await Report.find()
    res.render('admin', { reports })
}

module.exports = {
    index_get
}