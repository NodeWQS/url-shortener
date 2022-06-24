const Link = require('../models/link')

module.exports = class SystemController{
    static async create(req, res){
        try {
            const findLink = await Link.findOne({ link: req.body.link })
            
            if (!findLink){
                const newLink = new Link({
                    ...req.body,
                })
                await newLink.save()
                
                return res.status(200).json({
                    short_url: `${process.env.HOST}/system/${newLink._id}`
                })
            }

            return res.status(200).json({
                short_url: `${process.env.HOST}/system/${findLink._id}`
            })
        } catch (error) {
            return res.status(403).json({
                msg: 'problem with  server please try later.'
            })
        }
    }
    static async goto(req, res){
        try {
            const find = await Link.findOne({ _id: req.params.id })

            return res.redirect(find.link)
        } catch (error) {
            return res.redirect(process.env.HOST)
        }
    }
}