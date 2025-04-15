import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { regionOptions } from "./options.js";
import { fullInfoMeals, mealsTime } from "./melas.js";
// import { regionTime } from "../regions/region.js";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// bot.setMyCommands([
//   { command: "/start", description: "Boshlash" },
//   { command: "/register", description: "Ro'yxatdan o'tish" },
//   { command: "/namoz", description: "Namoz vaqtlari" },
// ]);

// // let existUser


// export const startBot = () => {
//   bot.on("message", async (msg) => {
//     const text = msg.text;
//     const chatId = msg.chat.id;
//     const first_name = msg.chat.first_name;
//     const username = msg.chat.username;
//     if (text === "/start") {
//       await bot.sendMessage(chatId, "Shopping start");
//     }
//     if (text === "/register") {
//       try {
//       let existUser = await UserModel.findOne({ id: chatId }).lean();
//         if (!existUser) {
//           await UserModel.create({
//             id: chatId,
//             first_name,
//             username,
//             created_at: new Date(),
//           });
//           return await bot.sendMessage(chatId, "You are registered");
//         } else {
//           return await bot.sendMessage(
//             chatId,
//             "Your account is already registered"
//           );
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//    if(text==='/namoz'){
//      await bot.sendMessage(chatId, "Hududni tanlang", regionOptions)
//    }
//   });  
//   bot.on('callback_query',async msg=>{
//     const data=msg.data
//     const chatId=msg.message.chat.id
//     const para=msg.message.text
//     let existUser = await UserModel.findOne({ id: chatId }).lean();

//     if(existUser){
//       await regionTime(data,chatId,bot)
//     }else{
//       await bot.sendMessage(chatId,'Please register')
//     }
//     console.log(existUser)
//     // console.log(para)
//     // console.log(chatId)
//   }) 
// };

bot.setMyCommands([
  { command: "/start", description: "Boshlash" },
  { command: "/register", description: "Ro'yxatdan o'tish" },
  { command: "/meals", description: "Ovqatni tanlang" },
]);

// let existUser


export const startBot = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendMessage(chatId, "Bot ish boshladi");
    }
  
  });
  bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id
    const para = msg.message.text
    let existUser = await UserModel.findOne({ id: chatId }).lean();

    if (existUser) {
      await mealsTime(data, chatId, bot)
    } else { 
      await bot.sendMessage(chatId, 'Please register')
    } 
    // console.log(msg.data) 
  if(data===msg.data){
    await fullInfoMeals(msg.data,chatId,bot)
  }
  })
}; 

