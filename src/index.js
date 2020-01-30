const fs = require('fs');
const spawn = require('child_process').spawn;
let serverProcess;
let restarting=false;
const startServer=()=>{
    process.stdout.write('\x1b[2J');
    process.stdout.write('\x1b[0f');
    //console.log(restarting);
    if(restarting)
        console.log("Restarting server...");
     serverProcess = spawn("node",["server.js"])
     serverProcess.stdout.on("error",(err)=>{
         console.error("ERROR:",err);
     });
     serverProcess.stdout.on("data",(buff)=>{
         if(restarting){
            process.stdout.write('\x1b[2J');
            process.stdout.write('\x1b[0f');
            restarting=false;
         }
        let msg = buff.toString();
        console.log(msg.substr(0,msg.length-1));
    });
    serverProcess.on("error",(err)=>{
       
       console.log(err);
   });
}

fs.watchFile('./app.js',{ interval: 1000 },async (cur,prev)=>{
    //console.log(cur,prev,JSON.stringify(cur)==JSON.stringify(prev));
    serverProcess.kill();
    restarting=true;
    startServer();
})
startServer();