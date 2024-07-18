const express = require("express")
const { collection, consommable,nonconsomablle,utilisateur } = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post("/",async(req,res)=>{
    const{user,password}=req.body

    try{
        const check=await collection.findOne({user:user})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})

///// consommable ///////

app.post("/Consommable/",async(req,res)=>{
    const{nom,marque,quantité}=req.body

    const data={
        nom:nom,
        marque:marque,
        quantité:quantité
    }

    try{
        const check=await consommable.findOne({nom:nom})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await consommable.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

////// NonCnsommable ///


app.post("/NonCnsommable",async(req,res)=>{
    const{nom,marque,numref}=req.body

    const data={
        nom:nom,
        marque:marque,
        numref:numref
    }

    try{
        const check=await nonconsomablle.findOne({nom:nom})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await nonconsomablle.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})


///// utilisateur////

app.post("/Utilisateur",async(req,res)=>{
    const{nom,email,role,password}=req.body

    const data={
        nom:nom,
        email:email,
        role:role,
        password:password
    }

    try{
        const check=await utilisateur.findOne({nom:nom})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await utilisateur.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

//// fetch ///

// Define a route to handle GET requests to fetch all user data
app.get("/utilisateur", async (req, res) => {
    try {
        // Fetch all user data from the collection
        const allUserData = await utilisateur.find();

        // Send the fetched data in the response
        res.json({ status: "success", data: allUserData });
    } catch (error) {
        // If any error occurs, send error message
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});
app.get("/Consommable", async (req, res) => {
    try {
        // Fetch all user data from the collection
        const allconsommable = await consommable.find();

        // Send the fetched data in the response
        res.json({ status: "success", data: allconsommable });
    } catch (error) {
        // If any error occurs, send error message
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});
app.get("/NonCnsommable", async (req, res) => {
    try {
        // Fetch all user data from the collection
        const allnonconsomablle = await nonconsomablle.find();

        // Send the fetched data in the response
        res.json({ status: "success", data: allnonconsomablle });
    } catch (error) {
        // If any error occurs, send error message
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});
app.delete("/Consommable/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await consommable.deleteOne({ _id: id });
        if (result.deletedCount == 1) {
            res.json({ status: "success", message: "Item deleted successfully" });
        } else {
            res.status(404).json({ status: "error", message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

app.put("/utilisateur/:id", async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const result = await utilisateur.updateOne({ _id: id }, { $set: { role: role } });

        if (result.modifiedCount === 1) {
            res.json({ status: "success", message: "Role updated successfully" });
        } else {
            res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});




app.listen(3000,()=>{
    console.log("port connected");
})
