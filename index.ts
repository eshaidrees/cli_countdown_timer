#! /usr/bin/env node

import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

const res = await inquirer.prompt({
    name:"userInput",
    type: "number",
    message: "Please enter the amount of second",
    validate: (input =>{
        if(isNaN(input)){
            return "Please enter valid number"
        }else if(input > 60){
            return "Seconds must be in 60"
        }else{
            return true;
        }
    })
});

let input = res.userInput

function startTime (val:number){
    const intiTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intiTime);
    setInterval(() => {
        const currentTiime = new Date()
        const timeDiff = differenceInSeconds(intervalTime,currentTiime);
        if(timeDiff <= 0){
            console.log("Timer has expired");
            process.exit();
        }
        const min = Math.floor((timeDiff%(3500*24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}  `);
        
    }, 1000);

}

startTime(input)