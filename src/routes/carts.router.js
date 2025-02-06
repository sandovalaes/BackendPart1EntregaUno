const CartsManager = require("../controllers/cartManager.js");
const manager =  new CartsManager("./src/data/carts.json");

const express = require('express');
const router = express.Router();

router.get("/carts/get", async (req,res)=>{
    try{
        const misCarritos = await manager.getCarts();
        let limit = parseInt(req.query.limit);

        if (limit){
            res.status(200).send(misCarritos.slice(0,limit));
        }else{
            res.status(200).send(misCarritos);
        }
    }catch(error){
        console.log(error)
        res.status(500).send({message:'Error al consultar los carritos.'})
    }
})

router.get("/carts/get/:cid",async (req,res)=>{
    try{
        let id = req.params.cid;
        const carrito = await manager.getCart(id);
        return res.status(200).json(carrito);
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Error al consultar el carrito solicitado."});
    }
})

router.post('/carts/post', async(req, res)=>{
    try{

        const newCart = req.body;
        const msg = await manager.addCart(newCart);
        res.status(200).send({message: `${msg}`});
    }catch(error){
        console.log(error)
        return res.status(500).send({message:'Error durante la creación del carrito.'})
    }
})

router.post('/carts/post/:cid/product/:pid', async(req, res)=>{
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;
        const msg = await manager.addProductToCart(cid,pid);
        res.status(200).send({message: `${msg}`});
    }catch(error){
        console.log(error);
        return res.status(500).send({message:'Error, no se pudo agregar el producto al carrito.'});
    }
})

module.exports = router