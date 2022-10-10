const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint-----------------------------------------------------------


// router.get('/', (req, res) => {
//  find all tags
//   be sure to include its associated Product data
// });

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(

      // do i need a first paramter? Do i need only Product Data without 'throuhg"?---------------
      {include: [{ model: Product, through: ProductTag }]}
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
// });


router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {  

         // where: {
      //   id: req.params.id,
      // },
      // include: [
      //   {
      //     model: Product,
      //   },
      // ],

      // do i need a first paramter? Do i need only Product Data without 'throuhg"?---------------
      include: [{ model: Product, through: ProductTag}]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tags found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', (req, res) => {
//   // create a new tag
// });

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });
// UPDATE TAG-----------------------------------------------------------


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },

      // {
      //   tag_name: req.body.tag_name,
      // },
      // {
      //   where: {
      //     id : req.params.id,
      //   },
      // }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
    } catch (err) {
    res.status(500).json(err);
    }

});


// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });


router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;