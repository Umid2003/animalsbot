// import TelegramBot from "node-telegram-bot-api";
// import "dotenv/config";

// const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });
 
// const animalsOptions = {
//     reply_markup: {
//         inline_keyboard: [
//             [
//                 { text: 'Fox', callback_data: 'fox' },
//                 { text: 'Tiger', callback_data: 'tiger' },
//                 { text: 'Lion', callback_data: 'lion' },
//                 { text: 'Bear', callback_data: 'bear' }

//             ]
//         ]
//     }
// }


// bot.on("message", async (msg) => {
//   const text = msg.text;
//   const chatId = msg.chat.id;
//   if (text === "/start") {
//     await bot.sendMessage(chatId, "Bot ish boshladi",animalsOptions);
//   }
// });
// bot.on('callback_query',async (msg)=>{
//     const data=msg.data
//     const chatId = msg.message.chat.id;  
//      fetch(`${process.env.ANIMALS_API}${data}`).then(res=>res.json()).then(data=>
//      data.map(async (item,index)=>{
//          await bot.sendMessage(chatId, `Title: ${item.name}
//             Family: ${item.taxonomy.family}
//             `)
//      }))   
    
    
// })


import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const animalsOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'Random Img', callback_data: 'random' },
                { text: 'Img by ID', callback_data: 'byid' }
            ]
        ]
    }
}

 
bot.on("message", async (msg) => {
    const text = msg.text; 
    const chatId = msg.chat.id;
    const reg = new RegExp("/^[a-zA-Z\s]+$/");
  try { 
      if (text === "/start") {
          await bot.sendMessage(chatId, "Bot ish boshladi", animalsOptions);
      }
      if (text == reg) {
          bot.sendMessage(chatId, 'Iltimos raqam kiriting')
      }
      if (text >= 100) {
          bot.sendMessage(chatId, 'Iltimos 99 dan katta son kiritmang')
      }
     
      if(text<100) {
          fetch(process.env.IMG_ID_API).then(res => res.json()).then(data =>
              bot.sendPhoto(chatId, data[text].download_url, animalsOptions)
          )
      } 
     
  } catch (error) {
    console.log(error)
  }
});
bot.on('callback_query', async (msg) => {
    const data = msg.data
    const chatId = msg.message.chat.id;
    const randomNumber=Math.floor(Math.random()*100)
    if(data=='random'){ 
        fetch(process.env.IMG_ID_API).then(res => res.json()).then(data =>
            bot.sendPhoto(chatId, data[randomNumber].download_url,animalsOptions)
        )
             
    }
    if (data === 'byid') {
        await bot.sendMessage(chatId, "Iltimos 0 dan 99 gacha raqam kiriting"); 
    }

})
