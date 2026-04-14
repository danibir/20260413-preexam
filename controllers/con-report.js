const jwt = require('jsonwebtoken')
const Report = require('../models/mod-report')
const cons = require('../js/constant')

const create_get = (req, res) => {
    res.render('reportcreate', { tags: cons.reportTags.filter(item => item !== "søppelpost") })
}
const create_post = async (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const tags = req.body.tags
    try {
        if (!title || !content || !tags) return res.status(400).render('error', { error: "400 - Missing fields"})

        const reportObj = {
            title,
            content,
            status: 0,
            tags
        }
        const report = new Report(reportObj)
        await report.save()
        res.redirect('/')
    } catch (err) {
        return res.status(500).render('error', { error: "500 - Server error"})
    }
}
const view_get = async (req, res) => {
    const id = req.params.id
    try {
        const report = await Report.findById(id)
        res.render('reportview', { report, tags: cons.reportTags })
    } catch (err) {
        return res.status(500).render('error', { error: "500 - Server error"})
    }
}
const edit_get = async (req, res) => {
    const id = req.params.id
    try {
        const report = await Report.findById(id)
        return res.render('reportedit', { report, tags: cons.reportTags })
    } catch (err) {
        return res.status(500).render('error', { error: "500 - Server error"})
    }

}
const edit_post = async (req, res) => {
    const id = req.params.id

    const status = req.body.status
    const tags = req.body.tags
    let note = req.body.note
    const contributor = jwt.verify(req.cookies?.user, "my_jwt_secret_for_now").username
    
    if (!status || !tags) return res.status(400).render('error', { error: "400 - Missing fields"})
    
    try {
        const report = await Report.findById(id)
        if (!report) return res.status(404).render('error', { error: "404 - Report not found" })
        if (note) {
            const newNote = `${note}\r\n\r\n- ${res.locals.name}`
            report.notes.push(newNote)
        }
        report.status = status
        report.tags = tags
        if (!report.contributors.includes(contributor)) report.contributors.push(contributor)
        
        await report.save()
        return res.redirect('/admin')
    } catch (err) {
        return res.status(500).render('error', { error: "500 - Server error"})
    }
}

module.exports = {
    create_get,
    create_post,
    view_get,
    edit_get,
    edit_post
}