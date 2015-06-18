# foodtrucksofsf

Food Trucks of SF provides a way for SF foodies to discover food trucks around SF by displaying all approved food trucks within a certain radius from anywhere on the map. If you ever wanted to find a food truck near your home or office, it's now a little easier than having to walk around. You can try out the app at [foodtrucksofsf.herokuapp.com/](http://foodtrucksofsf.herokuapp.com/). It's running on Heroku's free tier, so give it a couple seconds to spin up if it doesn't load right away.

## Architecture
This a full-stack app that I built for the Uber coding challenge. I'll describe the basics of the architecture here. Contributions are welcome (see below).

### Backend
The backend is written in Python, using the popular [Django]() framework, leveraging the popular [Django REST framework](http://www.django-rest-framework.org/) to build out the API and the [geopy](https://github.com/geopy/geopy) library to do geocoding and distance calculations. 

Food truck data is fetched from the [DataSF Mobile Food Facility Permit API](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat?) and stored in a PostgreSQL database. The script for this is actually outside the scope of the Django project, in [fetch_data.py](https://github.com/ricefield/foodtrucksofsf/blob/master/fetch_data.py). In production, I use Heroku Scheduler to run this once a night to retrieve new data. 

Being comfortable wth Django and using DRF to build out APIs, it was a good choice, given the time constraints. If I had more time, I would've loved to try out Flask (or Bottle) as I've had positive experiences working with microframeworks (Sinatra) and I think for an app with this kind of scope, a microframework would've been a more appropriate choice. 

Alternatively, I also considered taking advantage of Django's GIS framework, [GeoDjango](https://docs.djangoproject.com/en/1.8/ref/contrib/gis/) which has excellent integration with PostgreSQL's [PostGIS](http://postgis.net/) extension, and would've made some distance calculations cleaner and faster. Unfortunately, PostGIS isn't available on Heroku Postgres' free tier, so that was a no-go. 

### Frontend
The frontend is built using [React](http://facebook.github.io/react/) using the [Flux](https://facebook.github.io/flux/) architecture (specifically, using the [Reflux](https://github.com/spoike/refluxjs) implementation). This was my first time using React in a web app. I had played around with React not too long after it came out, and I was pretty impressed with it, so I jumped at the opportunity to use it in a project, figuring it was a great learning opportunity. Since then, Facebook had announced the Flux architecture, and several solid implementations of Flux have been floating around on Github, so I tried out Reflux at a friend's recommendation. 

Overall, I had a great time. Working in React is pretty awesome, and the abstractions provided by Reflux (actions and store) make it much easier than simply dumping a lot of state handling logic into your React components (10/10 would code again). 

### Deployment
Project is deployed on Heroku ([foodtrucksofsf.herokuapp.com/](http://foodtrucksofsf.herokuapp.com/)). Deploying a Django app on Heroku is [pretty straightforward](https://devcenter.heroku.com/articles/getting-started-with-django), and there are a lot of packages to make this easy. 

As mentioned prior, data is fetched nightly using [Heroku Scheduler](https://addons.heroku.com/scheduler) running `$ python manage.py flush --noinput; python fetch_data.py`. 

## Contributing
Contributions and suggestions are welcome. A few things I haven't had the time to do are in project [issues](https://github.com/ricefield/foodtrucksofsf/issues).

**Dependencies:** Python 2.7, PostgreSQL, NodeJS/npm (for frontend)

To build Django project locally:  
* `git clone git@github.com:ricefield/foodtrucksofsf.git` or fork.
* `pip install -r requirements.txt` (recommended that you use [virtualenv](https://virtualenv.pypa.io/en/latest/))
* Configure Postgres (see [`foodtrucks/settings.py`](https://github.com/ricefield/foodtrucksofsf/blob/master/foodtrucks/settings.py#L113) for default database or edit to use custom settings)
* `python manage.py migrate` to setup DB
* `python fetch_data.py` to grab data from DataSF
* `python manage.py runserver`
* To run test suite: `python manage.py test`

To build JS:  
* `npm install`
* run `webpack --watch` to build JS/JSX changes to `foodtrucks/static/app.js`
  * `webpack -p` for minified build (if you are submitting a pull request)
* Run tests (coming soon)


## License and Misc.
[MIT License](https://github.com/ricefield/foodtrucksofsf/blob/master/LICENSE) | Code by [Jonathan Tien](http://ricefield.me)




