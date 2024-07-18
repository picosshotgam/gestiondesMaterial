const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/react-login-tut")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const consomablleSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    marque:{
        type:String,
        required:true
    },
    quantité:{
        type:String,
        required:true
    }
})
const nonconsomablleSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    marque:{
        type:String,
        required:true
    },
    numref:{
        type:String,
        required:true
    }
})
const utilisateurSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)
const consommable = mongoose.model("consommable",consomablleSchema)
const nonconsomablle = mongoose.model("nonconsomablle",nonconsomablleSchema)
const utilisateur = mongoose.model("utilisateur",utilisateurSchema)

module.exports={collection,consommable,nonconsomablle,utilisateur}
