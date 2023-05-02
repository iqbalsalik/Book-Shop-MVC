const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require("./util/database");
const Product = require("./models/product");
const Users = require("./models/user");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req,res,next)=>{
    try{
        const user = await Users.findByPk(1);
        req.user = user;
        next();
    } catch(err){
        console.log(err)
    }
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(Users,{
    constraints:true,
    onDelete:"CASCADE"
});
Users.hasMany(Product);

sequelize.
// sync({force:true})
sync()
.then(result=>{
    return Users.findByPk(1)
}).then(user=>{
    if(!user){
       return Users.create({
            name:"Salik",
            emailId:"test@test.com"
        })
    }
    return user;
}).then(user=>{
    // console.log(user);
    app.listen(3000);
})
.catch(err=>console.log(err))

