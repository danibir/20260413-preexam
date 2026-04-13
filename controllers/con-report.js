const Report = require('../models/mod-report')


const create_get = (req, res) => {
    res.render('reportcreate')
}
const create_post = async (req, res) => {
    const title = req.body.title
    const content = req.body.content

    const reportObj = {
        title,
        content
    }
    const report = new Report(reportObj)
    await report.save()
    res.redirect('/')
}
const view_get = async (req, res) => {
    const id = req.params.id
    const report = await Report.findById(id)
    res.render('reportview', { report })
}
const edit_get = (req, res) => {
    const id = req.params.id
}
const edit_post = (req, res) => {
    const id = req.params.id
}

module.exports = {
    create_get,
    create_post,
    view_get,
    edit_get,
    edit_post
}