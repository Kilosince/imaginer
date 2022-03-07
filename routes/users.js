const router = require('express').Router();
const User = require('../models/user.model');
const Menu = require('../models/menu.model');
const Mog = require('../models/logmodel');
require('dotenv').config(); //you added this to test if it would improve logins\
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('./validation');
const verifyToken = require('./verifyToken');
const stripe = require('stripe')('sk_test_eA5oOivaWFtpfU2c98I1xo1f');
 //checkout route for signed



router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});





router.route('/add', verifyToken).post( async(req, res, next) => {

  //LETS VALIDATE THE DATA BEFORE WE CREATE A USER
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //CHECKING if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  //HASH password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  //CREATE A NEW USER
      const user = new User({
         name: req.body.name,
         kind: req.body.kind,
         email: req.body.email,
        password: hashedPassword
      });
      try {
          const savedUser = await user.save();
          res.send({user: user._id });
        } catch (err) {
           res.status(400).send(err);
           console.log(err);
        }
        next();
      });

      //LOGIN
      router.post('/login', async function (req,res) {
          //LETS VALIDATE THE DATA BEFORE WE CREATE A USER
          const { error } = loginValidation(req.body);
          if(error) return res.status(400).send(error.details[0].message);


              //CHECKING if the email exists already in the database
              const user = await User.findOne({email: req.body.email});
              if (!user) return res.status(400).send('No such email');
              //PASSWORD IS CORRECT
              const validPass = await bcrypt.compare(req.body.password, user.password)
              if(!validPass) return res.status(400).send('Invalid pasword')

              //CREATE and assign a jsonwebtoken
              const userHog = {
                _id: user._id,
                name: user.name,
                email: user.email,
                kind: user.kind,
                who: "winnie@gmail.com"
              }


              const token = jwt.sign({userHog}, process.env.TOKEN_SECRET);
              res.header('this-token', token).send(token);

      });




      router.delete('/logout', verifyToken, function(req, res) {
      delete req.user.userHog['id'];
        return res.send('You are loggedout');

        });



        router.get('/kind', verifyToken, function(req, res){
          const kind = req.user.userHog['email'];
          User.findOne({ email: kind })
            .then(users => res.json(users.kind))
            .catch(err => res.status(400).json('Error: ' + err));
        });




      router.get('/orders', verifyToken, function(req, res){
          const gmail = req.user.userHog['email'];
         User.findOne({ email: gmail })
         .then(order => res.json(order.orders))
         .catch(err => res.status(400).json('Error: ' + err));
       });

       router.route('/checkEmail').get((req, res) => {
         User.find()
           .then(users => res.json(users))
           .catch(err => res.status(400).json('Error: ' + err));
       });




       router.get('/status', verifyToken, function(req, res){
           const gmail = req.user.userHog['email'];
          User.findOne({ email: gmail })
          .then(statLine => res.json(statLine.statLine))
          .catch(err => res.status(400).json('Error: ' + err));
        });

// Gets the orders that is on user's Amino
       router.get('/amino', verifyToken, function(req, res){
           const gmail = "winnie@gmail.com";
          User.findOne({ email: gmail })
          .then(order => res.json(order.adminO))
          .catch(err => res.status(400).json('Error: ' + err));
        });

// Get backed up tickets
        router.get('/ticketstore', verifyToken, function(req, res){
            const gmail = req.user.userHog['email'];
           User.findOne({ email: gmail })
           .then(order => res.json(order.ticketb))
           .catch(err => res.status(400).json('Error: ' + err));
         });

        router.delete('/account', verifyToken, function(req, res){
         const gmail = req.user.userHog['email'];
         User.findOneAndDelete({email: gmail})
         .then(() => res.json('Its gone.'))
         .catch(err => res.status(400).json('Error: ' + err));

        });

       router.delete('/:id',  function(req, res) {
            User.findByIdAndDelete(req.params.id)
            .then(() => res.json('Its gone.'))
            .catch(err => res.status(400).json('Error: ' + err));

      });


      router.delete('/orders/all', verifyToken, function(req, res){
          const here = req.user.userHog['email'];
          User.updateOne({ email: here }, { "$set": {"orders": []}},
          { safe: true, multi:true }, function(err, obj) {

          })
          .then(() => res.json('Its all gone.'))
          .catch(err => res.status(400).json('Error: ' + err));

                 });


      router.delete('/damino/:id', verifyToken, function(req, res, next){
          const admin =  req.user.userHog['email'];
          User.updateMany({ email: admin}, { "$pull": {"adminO": {"_id": req.params.id}}},
          { safe: true, multi: true }, function(err, obj) {

          })
         .then((obj) => res.json(obj))
         .catch(err => res.status(400).json('Error: ' + err));

           });

  //tickerView delete process
           router.delete('/ticketd/:id', verifyToken, function(req, res, next){
               const admin =  req.user.userHog['email'];
              User.updateMany({ email: admin }, { "$pull": {"adminO": { "ourId": req.params.id  }}},
              { safe: true, multi:true }, function(err, obj) {

              })
              .then(() => res.json('Ticket Backed.'))
              .catch(err => res.status(400).json('Error: ' + err));

                });

                router.delete('/ticketr/:id', verifyToken, function(req, res, next){
                    const admin =  req.user.userHog['email'];
                   User.updateMany({ email: admin }, { "$pull": {"ticketb": { "_id": req.params.id  }}},
                   { safe: true, multi:true }, function(err, obj) {

                   })
                   .then(() => res.json('Ticket Backed.'))
                   .catch(err => res.status(400).json('Error: ' + err));

                     });

       router.delete('/orders/:id', verifyToken, function(req, res){
          const here = req.user.userHog['email'];
          User.updateOne({ email: here }, { "$pull": {"orders": { "_id": req.params.id  }}},
          { safe: true, multi:true }, function(err, obj) {

          })
          .then(() => res.json('Its all.'))
          .catch(err => res.status(400).json('Error: ' + err));

            });
//delete the status card of user's status
      router.delete('/status/:id', verifyToken, function(req, res){
           const here = req.user.userHog['email'];
           User.updateOne({ email: here }, { "$pull": {"statLine": { "_id": req.params.id  }}},
           { safe: true, multi:true }, function(err, obj) {

           })
          .then(() => res.json('Its all.'))
          .catch(err => res.status(400).json('Error: ' + err));

                 });




            router.post('/status', verifyToken, function(req, res){
              const st = {
              ourId: req.body.ourId,
              ready: req.body.ready,
              timeMan: req.body.timeMan
            }
              User.updateOne({ email: req.body.email }, { "$addToSet": {"statLine": st }},
              { safe: true, multi:true }, function(err, obj) {

              })
              .then(() => res.sendStatus(200))
              .catch((err) => res.sendStatus(err.message));

              });

        router.post('/confirmed', verifyToken, function(req, res){
          let email = req.user.userHog['email'];
          let ourId = req.user.userHog['email'] + req.body.commId;
                const st = {
                ourId: ourId,
                ready: req.body.ready
              }
                User.updateOne({ email: email }, { "$addToSet": {"statLine": st }},
                { safe: true, multi:true }, function(err, obj) {

                })
                .then(() => res.json('Its been sent.'))
                .catch(err => res.status(400).json('Error: ' + err));

                });

                  //post order gift
                router.post('/sendGift', verifyToken, function(req, res){
                  let email = req.body.email;
                        const giftData = {
                        ourId: req.body.commId,
                        ready: req.body.ready
                      }
                        User.updateOne({ email: email }, { "$addToSet": {"statLine": giftData }},
                        { safe: true, multi:true }, function(err, obj) {
                        console.log('greeting from users update call.');
                        })
                        .then(() => res.json('User call has been sent.'))
                        .catch(err => res.status(400).json('Error: ' + err));

                        });


            router.post('/orders', verifyToken, function(req, res){
              const gmail = req.user.userHog['email'];
              User.findOne({ email: gmail }, function(err, order){
                  if(err)
                  res.send(err);

                const moreOrder = {
                  imagePath: req.body.imagePath,
                  ourId: req.body.ourId,
                  title: req.body.title,
                  description: req.body.description,
                  notes: req.body.notes,
                  quantity: req.body.quantity,
                  price: req.body.price,
                  date: Date.parse(req.body.date)

                }

                  order.orders.push(moreOrder);

                 order.save(function(err){
                   if(err)
                    res.send(err);
                    res.json(order);
                 });

          });

              });

              router.put('/orders/info', verifyToken, function(req, res){

                      for (let i = 0; i < req.body.adCart.length; i++) {
                          const updateAd = {
                            ourId: req.body.oldEmail,
                            title: req.body.adCart[i].title,
                            notes: req.body.adCart[i].notes,
                            quantity: req.body.adCart[i].quantity,
                            price: req.body.adCart[i].price,
                            emailOp: req.body.newEmail,
                            date: new Date()


                          }


                          User.findOneAndUpdate({ email: "winnie@gmail.com" }, { "$addToSet": {"adminO": { "_id": req.params.id  }}},
                          { safe: true, multi: true }, function(err, obj) {
                            console.log(goOver);
                          })
                          .then(() => console.log('Its all gone.'))
                          .catch(err => res.status(400).json('Error: ' + err));
}
                });

// Post into order into user's Amino as part of Checkout
              router.post('/orders/info', verifyToken, function(req, res){
                const winnie = "winnie@gmail.com";
                let keymaker = req.user.userHog['email'] + req.body.commId;
                      for (let i = 0; i < req.body.adCart.length; i++) {
                          const goOver = {
                            ourId: keymaker,
                            title: req.body.adCart[i].title,
                            notes: req.body.adCart[i].notes,
                            quantity: req.body.adCart[i].quantity,
                            price: req.body.adCart[i].price,
                            date: new Date()


                          }

                          User.findOneAndUpdate({ email: winnie }, { "$addToSet": {"adminO": goOver }},
                          { safe: true, multi: true }, function(err, obj) {
                            console.log(goOver);
                          })
                          .then(() => console.log('Its all gone.'))
                          .catch(err => res.status(400).json('Error: ' + err));
}
                });

                router.get('/tickView/:id', verifyToken, function(req, res){
                  const gmail = "winnie@gmail.com";
                 User.findOne({ email: gmail })
                 .then(order => res.json(order.adminO))
                 .catch(err => res.status(400).json('Error: ' + err));

                     });

      router.put('/orders', verifyToken, function(req, res){
        const gmail = req.user.userHog['email'];
        User.findOne({ email: gmail }, function(err, order){
            if(err)
            res.send(err);

          const moreOrder = {
            imagePath: req.body.imagePath,
            ourId: req.body.ourId,
            title: req.body.title,
            description: req.body.description,
            notes: req.body.notes,
            quantity: req.body.quantity,
            price: req.body.price,
            date: Date.parse(req.body.date)


          }

            order.orders.push(moreOrder);

           order.save(function(err){
             if(err)
              res.send(err);
              res.json(order);
           });

  });

        });

        router.delete('/dlog/:id',  function(req, res) {
             Mog.findByIdAndDelete(req.params.id)
             .then(() => res.json('Its gone.'))
             .catch(err => res.status(400).json('Error: ' + err));

       });

        router.get('/menu/restore', verifyToken, async (req, res, next) => {
          Mog.find()
            .then(itemStora => res.json(itemStora))
            .catch(err => res.status(400).json('Error: ' + err));
          });

//post to recycle as part of delete process
          router.post('/menu/log', verifyToken, async (req, res, next) => {
            const logMenu = new Mog({
              imagePath: req.body.imagePath,
              title: req.body.title,
              description: req.body.description,
              price: req.body.price,
              available_quantity: req.body.available_quantity,
              date: Date.parse(req.body.date)


            });

            try {
                const savedMenu = await logMenu.save();
                res.send('saved');
              } catch (err) {
                 res.status(400).send(err);
              }
              next();
            });

  //ticket finder
            router.post('/ticketFinder/', verifyToken, (req, res, next) => {
                const winnie = "winnie@gmail.com";

                          const tickBack = {
                            ourId: req.body.ourId,
                            title: req.body.title,
                            notes: req.body.notes,
                            quantity: req.body.quantity,
                            price: req.body.price


                          }

                          User.findOneAndUpdate({ email: winnie }, { "$addToSet": {"ticketb": tickBack }},
                          { safe: true, multi: true }, function(err, obj) {
                            console.log(tickBack);
                          })
                          .then(() => res.sendStatus(200))
                          .catch((err) => res.sendStatus(err.message));



              });

              router.put('/upStatsend', verifyToken, (req, res) => {
                let email = req.user.userHog['email'];
                      const st = {
                      ourId: req.body.ourIdMan,
                      ready: req.body.weReady
                    }
                  User.findOneAndUpdate({ email: email, "statLine.ourId": st.ourId},
                    { "$set": { "statLine.$.ready": st.ready  }},
                    { safe: true, multi: true }, function(err, obj) {
                      console.log("updated the statline successfully");
                      console.log("up");
                    })
                      .then(() => res.sendStatus(200))
                      .catch((err) => res.sendStatus(err.message));

              });


 router.put('/adminup', verifyToken, (req, res) => {
 let oldE = req.body.oldEmail;
 let newE = req.body.newEmail;
 //for (let i = 0; i < req.body.adCart.length; i++){

  User.findOneAndUpdate({ email: "winnie@gmail.com", "adminO.ourId": oldE},
  { "$set": { "adminO.$.emailOp": newE  }},
  { safe: true, multi: true }, function(err, obj) {
    console.log("adminup");
    console.log("ad");
  })
  .then(() => res.sendStatus(200))
  .catch((err) => res.sendStatus(err.message));
//}


});




//Get Menu for user

        router.get('/menuitem', verifyToken, (req, res) => {
        Menu.find()
        .then(menus => res.json(menus))
        .catch(err => res.status(400).json('Error: ' + err));
      });


      router.put('/orders/update', verifyToken, (req, res, next) => { //generates the list of products in the cart


          res.send(req.user);

      });

//send order receipt
//send order receipt
router.post('/receiptme/', verifyToken, (req, res, next) => {
const email = req.user.userHog['email'];
const namer = req.user.userHog['name'];
const commId = req.user.userHog['email'] + req.body.commId;
const amount = req.body.amounter;
let captain = "info@theflyingpot.org";

   for (let i = 0; i < req.body.yourOrder.length; i++) {
    let orderMe = [];
let orderHelp = req.body.yourOrder[i].title;
        }



async function main() {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
host: "smtpout.secureserver.net",
port: 465,
secure: true, // true for 465, false for other ports
auth: {
user: "info@theflyingpot.org", // generated ethereal user
pass: "sparklingclementine", // generated ethereal password
},
});

// send mail with defined transport object
let info = await transporter.sendMail({
from: `"${captain}"`, // sender address
to: `"${captain}"`, // list of receivers
subject: "Thank you for your business! :)", // Subject line
text: `"Hello ${namer}. The total amount of your take out order was $${amount}. Thank you for your business!"`, // plain text body
html: `"<b> Hello ${namer}, your take out order total was $${amount}. Your order ID is ${commId}.
Thank you for your business!</b> "`, // html body
});

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


});

//post an email to verfiy account
//post an email to verfiy account
      router.post('/verify/',  (req, res, next) => {
    let receiver = req.body.email;
    let name = req.body.name;
    let captain = "info@theflyingpot.org";
    let code = req.body.verifyGuy;

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@theflyingpot.org", // generated ethereal user
      pass: "sparklingclementine", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${captain}"`, // sender address
    to: `"${captain}"`, // list of receivers
    subject: "Let's verify your account! :)", // Subject line
    text: `"Please paste this code ${code} into the verify user input space"`, // plain text body
    html: `"<b> Hello ${name}, This is your 6 digit verification code ${code}</b> "`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


  });


  router.post('/pay', verifyToken, async (req, res) => {
  try {
    let data = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: 'usd',
      source: req.body.token,
      description: 'My First Test Charge (created for API docs)',
    });
    res.json(data);
  } catch (e) {
    console.log(e);
    res.send(e.type);
  }
});

module.exports = router;
