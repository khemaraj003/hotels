const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');
const Person = require('../models/person');

// POST route to create a new menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new Menu(data);
        const response = await newMenuItem.save();
        console.log('Menu item saved successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to retrieve all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to retrieve menu items by category
router.get('/:category', async (req, res) => {
    const category = req.params.category;

    try {
        if (['starter', 'main', 'dessert', 'beverage'].includes(category)) {
            const menuItems = await Menu.find({ category });
            if (menuItems.length > 0) {
                console.log('Menu items fetched successfully');
                res.status(200).json(menuItems);
          } else {
                res.status(404).json({ message: 'No menu items found for this category' });
            }
        } else {
            res.status(400).json({ message: 'Invalid category' });
        }
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id',async(req,res)=>{
    try {
        const menuId=req.params.id;
        const updatedMenuData=req.body;
        const response=await Menu.findByIdAndUpdate(menuId,updatedMenuData,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({error:'person not found'})
        }
        console.log('data updates');
        res.status(200).json(response);

    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
     
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;

        // Find the person by ID and delete it
        const response = await Menu.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('Menu deleted successfully');
        res.status(200).json({ message: 'Person deleted successfully' });

    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;
