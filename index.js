const { Client, MessageEmbed } = require('discord.js')
const http = require('http')

const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
    intents: []
})

client.on('ready', () => {
    console.log(`Logged in as: ${client.user.tag}`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!')
    } else if (interaction.commandName === 'get') {
        if (interaction.options.getSubcommand() === 'id') {
            var options = {
                host: 'api.roblox.com',
                path: encodeURI(`/users/${interaction.options.getInteger('uid')}`),
            }
            callback = async function (response) {
                var recievedData = ''

                response.on('data', async function (chunk) {
                    recievedData += chunk
                })

                response.on('end', async function () {
                    try {
                        var jsonData = JSON.parse(recievedData)
                        if (jsonData["errors"]) {
                            await interaction.reply({
                                embeds: [new MessageEmbed({
                                    title: 'Error!',
                                    description: '`' + jsonData["errors"][0]["code"] + ': ' + jsonData["errors"][0]["message"] + '`',
                                    color: 'RED',
                                })],
                            })
                        } else if (jsonData["Username"] && jsonData["Id"]) {
                            await interaction.reply({
                                embeds: [new MessageEmbed({
                                    fields: [
                                        {
                                            name: 'Username',
                                            value: jsonData["Username"] + ' ',
                                            inline: true,
                                        },
                                        {
                                            name: 'UserID',
                                            value: jsonData["Id"] + ' ',
                                            inline: true,
                                        },
                                        {
                                            name: 'Profile',
                                            value: `[Link](https://roblox.com/users/${jsonData["Id"]})`,
                                            inline: true,
                                        },
                                    ],
                                    color: 'GREEN',
                                })],
                            })
                        } else {
                            await interaction.reply({
                                embeds: [new MessageEmbed({
                                    title: 'Error!',
                                    color: 'RED',
                                })],
                            })
                        }
                    } catch (err) {
                        await interaction.reply({
                            embeds: [new MessageEmbed({
                                title: 'Error!',
                                description: '`' + err + '`',
                                color: 'PURPLE',
                            })],
                        })
                    }
                })
            }
            http.request(options,callback).end();
        } else if (interaction.options.getSubcommand() === 'name') {
            var options = {
                host: 'api.roblox.com',
                path: encodeURI(`/users/get-by-username?username=${interaction.options.getString('username')}`),
            }
            callback = async function (response) {
                var recievedData = ''

                response.on('data', async function (chunk) {
                    recievedData += chunk
                })

                response.on('end', async function () {
                    try {
                        var jsonData = JSON.parse(recievedData)
                        if (jsonData["success"] != null && jsonData["success"] === false) {
                            await interaction.reply({
                                embeds: [new MessageEmbed({
                                    title: 'Error!',
                                    description: '`' + jsonData["errorMessage"] + '`',
                                    color: 'RED',
                                })],
                            })
                        } else if (jsonData["Username"] && jsonData["Id"]) {
                            await interaction.reply({
                                embeds: [new MessageEmbed({
                                    fields: [
                                        {
                                            name: 'Username',
                                            value: jsonData["Username"] + ' ',
                                            inline: true,
                                        },
                                        {
                                            name: 'UserID',
                                            value: jsonData["Id"] + ' ',
                                            inline: true,
                                        },
                                        {
                                            name: 'Profile',
                                            value: `[Link](https://roblox.com/users/${jsonData["Id"]})`,
                                            inline: true,
                                        },
                                    ],
                                    color: 'GREEN',
                                })],
                            })
                        } else {
                            await interaction.reply({
                                embeds: [new MessageEmbed({
                                    title: 'Error!',
                                    color: 'RED',
                                })],
                            })
                        }
                    } catch (err) {
                        await interaction.reply({
                            embeds: [new MessageEmbed({
                                title: 'Error!',
                                description: '`' + err + '`',
                                color: 'PURPLE',
                            })],
                        })
                    }
                })
            }
            http.request(options,callback).end();
        }
    }
})

client.login(process.env.TOKEN)