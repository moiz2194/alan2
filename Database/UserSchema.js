const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    birthday:{
        type: Date,
        required: true
    },
    RegisteredDate:{
        type: Date,
        default: Date.now, 
    },
    totalbalance:{
        type: Number
    },
    ppstart:{
        type: Number
    },
    ppadvance:{
        type: Number
    },
    pppro:{
        type: Number
    },
    initialcapital:{
        type: Number
    },
    grancias:{
        type: Number
    },
    bloqueado:{
        type: Number
    },
    disponible:{
        type: Number
    },
    miembrostotale:{
        type: Number
    },
    derivadostotale:{
        type: Number
    },
    rangostotale:{
        type: Number
    },
    ultimorango:{
        type: String
    },
    saldo:{
        type: Number
    },
    cartera:{
        type: String
    },
    mymembresia:{
        type: String
    },
    estrategia:{
        type: String
    },
    ganaciasretirades:{
        type: Number
    },
    totaldisponible:{
        type: Number
    },
    pic:{
        type: Number
    },
    tc:{
        type: Number
    },
    membreciabtc500:{
        type: Number
    },
    membreciabtc1000:{
        type: Number
    },
    fullname:{
        type: String
    },
    bankname:{
        type: String
    },
    iban:{
        type: String
    },
    phone:{
        type: String
    },
    country:{
        type: String
    },
    plan:{
        type: String
    },
    membership:{
        type: String
    },
    membershipValid:{
        type: Date
    },
    bonusc1e1:{
        type: String
    },
    bonusc1e2:{
        type: String
    },
    bonusc1e3:{
        type: String
    },
    bonusc1e4:{
        type: String
    },
    bonusc2e1:{
        type: String
    },
    bonusc2e2:{
        type: String
    },
    bonusc2e3:{
        type: String
    },
    bonusc2e4:{
        type: String
    },
    planHistory:[
        {
            date: Date,
            planName: String,
            profit: Number,
            contractNumber: String,
            amount: Number,
        }
    ],
    addedMembers:[
        {
            email: String,
        }
    ],
    withdraws: [
        {
            withdraw: Number,
        }
    ],
    contactQueries: [
        {
            name: String,
            subject: String,
            email: String,
            phone: String,
            message: String,
            msgTime: {
                type: Date,
                default: Date.now, 
            }
        }
    ],
    members: [
        {
            memberid: String,
        }
    ],
    tokens: [
        {
            token: String,
        }
    ],
    cart: [
        {
            product: {},
        }
    ]
})

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})
UserSchema.methods.generateAuthToken = async function(){
    const mytoken = jwt.sign({_id:this._id},"helloiamafaqstudentofuniversityofmanagementandtechonology")
    this.tokens = this.tokens.concat({token: mytoken});
    await this.save();
    return mytoken;
}
UserSchema.methods.addtocart = async function(product){
    this.cart = this.cart.concat({product});
    const resp = await this.save();
    if(resp){
        return resp;
    }
}

const UserModel = new mongoose.model('UserData',UserSchema);
module.exports = UserModel