const User = require('../models/user.model')
const log = require('../utils/log')

const validateLink = link => link.includes('nitrotype.com/racer/') ? true : false

module.exports = async (msg, client, args) => {
    
    // check if the user already has an account
    const userExists = await User.findOne({
        discordId: msg.author.id
    })

    if (userExists) 
        return msg.reply('You already have an account!')

    // validate link
    const ntLink = args[0]
    if (validateLink(ntLink)) {
        const user = new User({
            date: new Date(),
            name: msg.author.username, 
            nitroTypeLink: ntLink, 
            discordId: msg.author.id,
            discordTag: msg.author.tag
        })
        user.save(err => {
            if (err) {
                log('error', err)
                return msg.reply('Error creating account. Contact a LeCashBot dev!')
            } else return msg.reply('Success! See `$help` for information on commands')
        })
    } else msg.reply('Invalid NitroType profile link!')

}