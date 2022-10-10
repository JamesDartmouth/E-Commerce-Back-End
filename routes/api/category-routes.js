const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint------------------------------------


// router.get('/', (req, res) => {
//   // find all categories
//   // be sure to include its associated Products
// });

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(

      // do i need a first paramter? Do i need only Product Data without 'throuhg"?---------------
    {include: [{ model: Product}]}
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:id', (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {  

      // where: {
      //   id: req.params.id,
      // },
      // include: [
      //   {
      //     model: Product,
      //   },
      // ],

      // do i need a first paramter? Do i need only Product Data without 'throuhg"?---------------
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.post('/', (req, res) => {
//   // create a new category
// });


router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
// });
// UPDATE Category----------------------------------------------------

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
    res.status(200).json(updatedCategory);
    } catch (err) {
    res.status(500).json(err);
    }

});



// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
// });


router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;