const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("API is running");
})


app.post('/bfhl', (req, res)=>{
    const {data} = req.body;
    if(!Array.isArray(data)){
        return res.status(400).json({is_success: false, message: "Invalid"});
    }
    const full_name = "john_doe";
    const dob = "17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alphaConcat = "";


    data.forEach(item => {
        if (!isNaN(item)) {
            let num = Number(item);
            if(num % 2 === 0){
                even_numbers.push(item);
            } else{
                odd_numbers.push(item);
            }
            sum += num;
        } else if(/^[a-zA-Z]+$/.test(item)){
            alphabets.push(item.toUpperCase());
            alphaConcat += item;
        } else {
            special_characters.push(item);
        }
    });
    const rev = alphaConcat.split('').reverse();
    let concat_string = '';
    for (let i = 0; i < rev.length; i++) {
        concat_string += i % 2 === 0
        ? rev[i].toUpperCase()
        : rev[i].toLowerCase();
    }

    res.status(200).json({
        is_success: true,
        user_id: `${full_name}_${dob}`,
        email: email,
        roll_number: roll_number,
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string
    });
})

app.listen(PORT, ()=>{
    console.log(`Server is running on the port at ${PORT}`);
});