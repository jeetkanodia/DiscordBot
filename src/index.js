import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

client.on("ready", (c) => console.log(`Logged in as ${c.user.tag}!`));

client.on("messageCreate", (message) =>
  console.log(message.author.username, message.guild.name)
);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

async function main() {
  const commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
  ];
  try {
    console.log("Started refreshing application (/) commands.");

    // use this if you want to register commands globally

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    // use this if you want to register commands in a guild

    // await rest.put(
    //   Routes.applicationGuildCommands(
    //     process.env.CLIENT_ID,
    //     process.env.GUILD_ID
    //   ),
    //   {
    //     body: commands,
    //   }
    // );

    client.login(process.env.BOT_TOKEN);
  } catch (error) {
    console.error(error);
  }
}

main();
