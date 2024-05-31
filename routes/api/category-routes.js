const router = require('express').Router();
const { Category, Product } = require('../../models');

// making requests to `/api/categories` endpoint

// all categories & associated products
router.get('/', async (req, res) => {
    try {
        const fetchAll = await Category.findAll((req), {
            include: [
                {
                    model: Product
                }
            ]
        });
        res.json(fetchAll);
        //res.render ?
    } catch (err) {
        res.status(500).json(err);
    }
});

// find one Category by id & associated products
router.get('/:id', async (req, res) => {
    try {
        const findCategory = await Category.findByPk((req.params.id), {
            include: [
                {
                    model: Product
                }
            ]
        });
        if (!findCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }

        res.json(findCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new category
router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create({
            name: req.body.categoryName
    });
    res.status(200).json(newCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update an existing category by id
router.put('/:id', async (req, res) => {
    try {
        const editCategory = await Category.update(req.body, {
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(editCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete category by id value
router.delete('/:id', async (req, res) => {
    try {
        const rmCategory = await Category.delete(req.body, {
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(rmCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;