import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const animalsOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'Fox', callback_data: 'fox' },
                { text: 'Tiger', callback_data: 'tiger' },
                { text: 'Lion', callback_data: 'lion' },
                { text: 'Bear', callback_data: 'bear' }

            ]
        ]
    }
}


bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/start") {
    await bot.sendMessage(chatId, "Bot ish boshladi",animalsOptions);
  }
});
bot.on('callback_query',async (msg)=>{
    const data=msg.data
    const chatId = msg.message.chat.id;  
     fetch(`${process.env.ANIMALS_API}${data}`).then(res=>res.json()).then(data=>
     data.map(async (item,index)=>{
         await bot.sendMessage(chatId, `Title: ${item.name}
            Family: ${item.taxonomy.family}
            `)
     }))   
    
    
})
