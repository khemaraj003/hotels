const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Make sure to use the correct path

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data); // Use 'Person' model to create a new instance
        const response = await newPerson.save(); // Await the save operation
        console.log('Data saved successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const persons = await Person.find(); // Fetch all Person records
        res.status(200).json(persons); // Respond with the data in JSON format
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:workType', async (req, res) => {
    const workType = req.params.workType;

    try {
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const persons = await Person.find({ work: workType });

            if (persons.length > 0) {
                console.log('Response fetched successfully');
                res.status(200).json(persons);
            } else {
                res.status(404).json({ message: 'No persons found for this work type' });
            }
        } else {
            res.status(400).json({ message: 'Invalid work type' });
        }
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//sdkj
router.put('/:id',async(req,res)=>{
    try {
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
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
// DELETE route to delete a person by ID
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        // Find the person by ID and delete it
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person deleted successfully');
        res.status(200).json({ message: 'Person deleted successfully' });

    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;
