const router = require('express').Router();
let Menu = require('../models/menu.model');
const verifyToken = require('./verifyToken');

            router.get('/', (req, res) => {
              Menu.find()
              .then(menus => res.json(menus))
              .catch(err => res.status(400).json('Error: ' + err));
            });

            router.post('/add',async (req, res, next) => {


                     //CREATE A NEW USER
                         const newMenu = new Menu({
                            imagePath: req.body.imagePath,
                            title: req.body.title,
                            description: req.body.description,
                            price: req.body.price,
                            available_quantity: req.body.available_quantity,
                            date: Date.parse(req.body.date)
                         });

                         try {
                             const savedMenu = await newMenu.save();
                             res.send('saved');
                           } catch (err) {
                              res.status(400).send(err);
                           }
                           next();
                         });




             router.get('/:id', (req, res) => {
                Menu.findById(req.params.id)
                .then(menus => res.json(menus))
                .catch(err => res.status(400).json('Error: ' + err));
              });





             router.delete('/:id', (req, res) => {
                          Menu.findByIdAndDelete(req.params.id)
                          .then(() => res.json('Its gone.'))
                          .catch(err => res.status(400).json('Error: ' + err));

                    });

              router.put('/update/quant', verifyToken, function(req, res){
                                          Menu.findById(req.body.id)
                                            .then(menu => {
                                              menu.imagePath = req.body.imagePath;
                                              menu.title = req.body.title;
                                              menu.description = req.body.description;
                                              menu.price = req.body.price;
                                              menu.available_quantity = req.body.available_quantity,
                                              menu.date = Date.parse(req.body.date);

                                              menu.save()
                                              .then(() => res.json('menu updated!'))
                                              .catch(err => res.status(400).json('Error: ' + err));
                                            })
                                            .catch(err => res.status(400).json('Error: ' + err));

                                    });

                router.put('/update/:id', (req, res) => {
                                  Menu.findById(req.params.id)
                                    .then(menu => {
                                      menu.imagePath = req.body.imagePath;
                                      menu.title = req.body.title;
                                      menu.description = req.body.description;
                                      menu.price = req.body.price;
                                      menu.available_quantity = req.body.available_quantity,
                                      menu.date = Date.parse(req.body.date);

                                      menu.save()
                                      .then(() => res.json('menu updated!'))
                                      .catch(err => res.status(400).json('Error: ' + err));
                                    })
                                    .catch(err => res.status(400).json('Error: ' + err));

                            });


      module.exports = router;
