//index
const index_get = (req, res) => {
    console.log(req.cookies)
    const buttons = []

    res.render('index', { buttons })
}

//export
module.exports = {
    index_get
}