//index
const index_get = (req, res) => {
    const buttons = []

    res.render('index', { buttons })
}

//export
module.exports = {
    index_get
}