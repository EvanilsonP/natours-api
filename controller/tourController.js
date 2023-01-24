const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
}

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

module.exports = { getAllTours, postTour, getTour, deleteTour, attTour };