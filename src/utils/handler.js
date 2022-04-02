import fs from 'fs';
import path from 'path';
export default class Handlers {
    commands = [];
    events = [];
    constructor(client) {
        this.client = client;
        // Once Commands are Loaded we listen for them
        this.client.on('interactionCreate', async (interaction) => {
            // Fire the Command
            this.fireCommand(interaction);
        })

    }   
    async loadCommandFiles(command) {

        let filePath = fs.readdirSync(path.join(command));

        for (let file of filePath) {
            // Checks to See if there are any Sub Directories and loads them if there are
            if (fs.lstatSync(path.join(command, file)).isDirectory()) {
                this.loadCommandFiles(path.join(command, file));
            }
            // If the file does not end with .ts or .js, ignore it
            if (!file.endsWith('.ts') && !file.endsWith('.js')) return;
            // now we find the file
            let fileName = path.join(command, file);
            // now we load the file
            let commandFile = require(path.resolve(fileName));
            // Push File into the array
            this.commands.push(commandFile);
        }
        this.registerCommands(this.commands);
        console.log('Total Commands Loaded: ' + this.commands.length);
    }

    async registerCommands(commands) {
        let testGuild = await this.client.guilds.fetch(process.env.TEST_GUILD);
            
        // Now if the command is a test command create it in the guild
        for (let command of commands) {
            // If the command is a test command
            if(testGuild && command.testCommand) {
                // Create the command in the guild
                testGuild.commands?.create({
                    name: command.name.toLowerCase(),
                    description: command.description,
                    options: command.options,
                })
            }
            if(!command.testCommand) {
                // Create the command in the guild
                this.client.application.commands?.create({
                    name: command.name.toLowerCase(),
                    description: command.description,
                    options: command.options,
                })
            }
        }
    }
    async fireCommand(interaction) {
        if(!interaction.isCommand) return;
        // Get the Interaction information
        const { commandName, options, user } = interaction;
        // Get the Command
        const command = this.commands.find(command => command.name === commandName);
        // If the command does not exist, return
        if(!command) return;
        // If the command is a test command
        let optionArray = [];
        // If the command has options
        if(command.options) {
            // Loop through the options
            for(let option of options._hoistedOptions) {
                // Push the option into the array
                optionArray.push({
                    name: option.name,
                    type: option.type,
                    // Slice of values to arguments
                    value: option.value.split(" ")
                })
            }
        }
        // If the Command is owner only and the user is not the owner
        if(command.ownerOnly && user.id !== process.env.OWNER_ID) return interaction.reply({content: 'You do not have permission to use this command'});
        try {
            // Attempt to execute the command
            await command.execute( interaction, this.client, optionArray, user);
        } catch (error) {
            // If there is an error, log it
            console.error(error);
            // Send the error to the user
            interaction.reply('There was an error executing the command ' + commandName + '\n' + error);
        }
    }
    async loadEventFiles(event) {
        // Get the file path
        let filePath = fs.readdirSync(path.join(event));
        // Loop through the files
        for (let file of filePath) {
            // Checks to See if there are any Sub Directories and loads them if there are
            if (fs.lstatSync(path.join(event, file)).isDirectory()) {
                // Load the Event Files in the Sub Directory
                this.loadEventFiles(path.join(event, file));
            }
            // If the file does not end with .ts or .js, ignore it
            if (!file.endsWith('.ts') && !file.endsWith('.js')) return;
            // now we find the file
            let fileName = path.join(event, file);
            // now we load the file
            let eventFile = require(path.resolve(fileName));
            // Bind eventFile to the exeucute and pass thru args
            this.client.on(eventFile.name, (...args) => {
                // Execute the event with the args
                eventFile.execute(...args);
            })
        }
        console.log('Total Events Loaded: ' + this.commands.length);
    }
}