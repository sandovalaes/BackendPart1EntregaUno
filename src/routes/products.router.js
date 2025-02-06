const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/productManager.js");
const manager = new ProductManager("./src/data/productos.json");

//Realizamos ejemplo con el limit:

router.get("/products/get", async (req, res) => {
    let limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();

        if (limit) {
            res.status(200).send(arrayProductos.slice(0, limit));
        } else {
            res.status(200).send(arrayProductos);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error interno del servidor."});
    }
})

router.get("/products/get/:pid", async (req, res) => {
    try{
        let id = req.params.pid;
        const producto = await manager.getProductById(parseInt(id));
    
        if (!producto) {
            res.status(200).send({message: "No se encuentra el producto consultado."});
        } else {
            res.status(200).send({ producto });
        }
    }catch(error)
    {
        console.log(error);
        res.status(500).send({message: "Error interno del servidor."});
    }
})

router.post("/products/post", async (req, res) => {
    const nuevoProducto = req.body;
    try {
        await manager.addProduct(nuevoProducto);
        res.status(201).send({ message: "Producto agregado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

router.put('/products/put/:idProduct', async(req, res)=>{
    try{
        const id = req.params.idProduct
        const productUpdated = req.body
        await manager.updateProduct(productUpdated)
        res.status(201).send({ message: "Producto actualizado exitosamente." });
    }catch{
        console.log(error);
        return res.status(500).send({message: 'Error durante la actualización del producto.'});
    }
})

router.delete('/products/delete/:idProduct', async(req, res)=>{
    try{
        const id = req.params.idProduct;
        const msg = await manager.deleteProduct(id);
        res.status(200).send({ message: `${msg}` });
    }catch(error){
        console.log(error);
        return res.send({message: 'Error durante la eliminación del producto.'});
    }
})

module.exports = router; 