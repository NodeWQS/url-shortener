const { verify } = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const verifed = verify(req.body.token, process.env.TOKEN)
        req.body.customer = verifed.id
        next()
    } catch (error) {
        return res.status(403).json({
            msg: 'token not definded.'
        })
    }
}