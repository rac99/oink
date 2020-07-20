const router = require('express').Router();
let Location = require('../models/location.model');

router.route('/').get((req, res) => {
  Location.find()
    .then(locations => res.json(locations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const address = req.body.address;
  const city = req.body.city;
  const province = req.body.province;
  const country = req.body.country;
  const postal_code = req.body.postal_code;
  
  const username = req.body.username;
  const description = req.body.description;

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const newLocation = new Location({
    address,
    city,
    province,
    country,
    postal_code,
    username,
    description,
    latitude,
    longitude,
  });

  newLocation.save()
  .then(() => res.json('Location added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Location.findById(req.params.id)
      .then(location => res.json(location))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Location.findByIdAndDelete(req.params.id)
      .then(() => res.json('Location deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Location.findById(req.params.id)
      .then(location => {
        location.username = req.body.username;
        location.address = req.body.address;
        location.city = req.body.city;
        location.province = req.body.province;
        location.country = req.body.country;
        location.postal_code = req.body.postal_code;
        location.description = req.body.description;
        location.latitude = req.body.latitude;
        location.longitude = req.body.longitude;
  
        location.save()
          .then(() => res.json('Location updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;