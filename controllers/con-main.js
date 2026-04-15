//index
const index_get = (req, res) => {
    const buttons = []
    res.locals.title = "Hjemmeside"
    res.render('index', { buttons })
}
const faq_get = (req, res) => {
    res.render('faq')
}

//export
module.exports = {
    index_get,
    faq_get
}