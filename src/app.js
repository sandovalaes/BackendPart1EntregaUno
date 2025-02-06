const path = require('path');
const express = require('express');
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js")

app.use(express.json());
//app.use(express.urlencoded({extended : true}))

//app.use(express.static(path.join(__dirname,'public')))

app.use("/api",productsRouter)
app.use("/api",cartRouter)

//app.get('/',(req,res) =>{res.send('Mi primer servidor')})

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo sobre el puerto ${PORT}`)
})