const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// It enables the visualiation of the content created on postman in the terminal, if using console.log(req.body) (POST)
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
}

app.get('/api/v1/tours', getAllTours);

const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1; // Converting string into a number
    const tour = tours.find(el => el.id === id); // Finding an ID within an array

    if(id > tours.length) { // or if(!tour)
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID.'
        })
    };

    res.status(200).json({
        status: 'success',
        data: {
            tours: tour
        }
    });
}

app.get('/api/v1/tours/:id', getTour);

const postTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1 ].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    });
}

app.post('/api/v1/tours', postTour);

const attTour = (req, res) => {
    if(req.params.id * 1 > tours.length) { // or if(!tour)
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID.'
        })
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here.>'
        }
    });
}

app.patch('/api/v1/tour/:id', attTour);

const deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length) { // or if(!tour)
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID.'
        })
    };

    res.status(204).json({
        status: 'success',
        data: {
            tour: null
        }
    });
}

app.delete('/api/v1/tour/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(postTour);
app.route('/api/v1/tours/:id').get(getTour).patch(attTour).delete(deleteTour);

app.listen(port, () => console.log(`App running on port ${port}`));