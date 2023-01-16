const express=require("express");
const {connection}=require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {noteRouter}=require("./routes/Note.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")

const app=express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page")
})


app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

// app.get("/data",(req,res)=>{
//     const token=req.headers.authorization
//     // console.log(req.headers) --> authorization--> small "a"
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Invalid token")
//             console.log(err)
//         }
//         else
//         {
//             res.send("Data...")
//         }
//       }); 
// })

// app.get("/cart",(req,res)=>{
//     const token=req.query.token
//     jwt.verify(token, 'masai', (err, decoded)=> {
//         if(err){
//             res.send("Invalid token")
//             console.log(err)
//         }
//         else
//         {
//             res.send("Data...")
//         }
//       });
// })



app.listen(4500,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("trouble connecting to the DB")
        console.log(err);
    }
    console.log("Server is running at port 4500")
})