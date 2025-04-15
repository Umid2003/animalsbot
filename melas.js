let mealId
export const mealsTime = (region, id, bot) => {
    try {
        fetch(`${process.env.MEAL_API}${region}`)
            .then((res) => res.json())
            .then((data) => { 
                `${id}`,
                    data.meals ? data.meals.slice(0, 2).map(async (item, index) => {
                        mealId=
                        await bot.sendMessage(`${id}`, `${item.strMealThumb} Title: 
                             ${item.strMeal}
             Region: ${item.strArea}`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: 'Read More Info', callback_data: `${item.idMeal}` },
                                    ]
                                ]
                            }
                        });
                    }):'No result',
                {
                    parse_mode: "markdown",
                };
            });
    } catch (error) {
        console.log(error);
    }
};
 
export const fullInfoMeals=(id,chat,bot)=>{
    // let newMeal={}
    try {
        fetch(`${process.env.MEAL_ID_API}${id}`)
            .then((res) => res.json())
            .then((data) => {
                bot.sendMessage(`${chat}`, `Tiktle:${data.meals[0].strMeal}, 
                    Instructions: ${data.meals[0].strInstructions},
                    Youtube: ${ data.meals[0].strYoutube}
                    `),
                    
                    {
                    parse_mode: "markdown",
                };
            });
    } catch (error) {
        console.log(error);
    }
    // console.log(newMeal)
}