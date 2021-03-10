const { TOPGGTOKEN } = require('../../config/botconfig.json')
const chalk = require('chalk')
const AutoPoster = require('topgg-autoposter')

module.exports = async (client) => {
    const ap = AutoPoster(TOPGGTOKEN, client)
    ap.on('posted', () => {
    console.log(chalk.green('<API WRAPPER>') + ' ' + chalk.blue('Posted stats to Top.gg!'))
})
};