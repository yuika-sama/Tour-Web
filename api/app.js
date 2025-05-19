require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const usersRoute = require('./routes/users.route');
const tourSchedulesRoute = require('./routes/tour_schedules.route');
const toursRoute = require('./routes/tours.route');
const tourMediaRoute = require('./routes/tour_media.route');
const paymentsRoute = require('./routes/payments.route');
const passwordResetsRoute = require('./routes/password_resets.route');
const bookingsRoute = require('./routes/bookings.route');
const reviewsRoute = require('./routes/reviews.route');
const authRoute = require('./routes/auth.route');
    
app.use(cors());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/tourschedules', tourSchedulesRoute);
app.use('/tours', toursRoute);
app.use('/tourmedia', tourMediaRoute);
app.use('/payments', paymentsRoute);
app.use('/passwordresets', passwordResetsRoute);
app.use('/bookings', bookingsRoute);
app.use('/reviews', reviewsRoute);
app.use('/auth', authRoute);



app.use('/', (req, res)=>{
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

