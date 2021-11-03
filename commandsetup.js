const { Client } = require('discord.js')

const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
    intents: []
})

client.on('ready', () => {
    console.log(`Setting up commands for: ${client.user.tag}`)

    let commands = client.application.commands

    commands.create({
        type: 1, // CHAT_INPUT
        name: 'ping',
        description: 'Replies with pong.',
    })
    commands.create({
        type: 1, // CHAT_INPUT
        name: 'get',
        description: 'Get info about a Roblox account.',
        options: [
            {
                type: 1, // SUB_COMMAND
                name: 'id',
                description: 'Get info about a Roblox account with the specified userid.',
                options: [
                    {
                        type: 4, // INTEGER
                        name: 'uid',
                        description: 'The target userid.',
                        required: true,
                    },
                ],
            },
            {
                type: 1, // SUB_COMMAND
                name: 'name',
                description: 'Get info about a Roblox account with the specified username.',
                options: [
                    {
                        type: 3, // STRING
                        name: 'username',
                        description: 'The target username.',
                        required: true,
                    },
                ],
            },
        ],
    })
    
    console.log(`Finished setting up commands for: ${client.user.tag}`)
})

client.login(process.env.TOKEN)