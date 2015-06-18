# API documentation
All data is pulled from the Mobile Food Facility Permit dataset on DataSF: [https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat?](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat?). 

**API Root:** `/api/` 

## Trucks

Basic API to retrieve truck data.

**URL:** `trucks/`  
**Allow:** `GET`, `POST`  
**Content-Type:** `application/json`
**Fields:**  
- `id` (integer): primary key of truck
- `name` (string): name of truck and/or truck owner
- `type` (string): either "Truck", "Cart", or blank
- `address` (string): human-readable address of cart
- `food` (string): menu items supplied by cart owner
- `lat` (float): cart location latitude, in degrees
- `long` (float): cart location longitude, in degrees

### Examples:

**`GET /api/trucks/`**   

**Response:**  

  [
      {
          "id": 1,
          "name": "May Catering",
          "type": "Truck",
          "address": "1300 BRYANT ST",
          "food": "Cold Truck: Sandwiches: fruit: snacks: candy: hot and cold drinks",
          "lat": 37.7690871267671,
          "long": -122.411527667132
      },
      {
          "id": 2,
          "name": "Quan Catering",
          "type": "Truck",
          "address": "222 02ND ST",
          "food": "Cold Truck: Soft drinks: cup cakes: potato chips: cookies: gum: sandwiches (hot & cold): peanuts: muffins: coff (hot & cold): water: juice: yoplait: milk: orange juice: sunflower seeds: can foods: burritos: buscuits: chimichangas: rice krispies",
          "lat": 37.786319798284,
          "long": -122.398235074249
      },
      {
          "id": 3,
          "name": "Celtic Catering",
          "type": "Truck",
          "address": "217 SANSOME ST",
          "food": "Eritrean & Irish Fusion Burgers: Irish Stew: Eritrean Stew:  Shepard's Pie: Beverages",
          "lat": 37.7923898619832,
          "long": -122.401269695236
      },

      ...
      (truncated)

**`GET /api/trucks/1/`**  

**Response:**

  {
      "id": 1,
      "name": "May Catering",
      "type": "Truck",
      "address": "1300 BRYANT ST",
      "food": "Cold Truck: Sandwiches: fruit: snacks: candy: hot and cold drinks",
      "lat": 37.7690871267671,
      "long": -122.411527667132
  }


## Nearby

Returns all trucks within a given `radius` of center (`lat` and `lon`).

**URL:** `nearby/`  
**Allow:** `GET`, `POST`  
**Content-Type:** `application/json`
**Query Arguments**: `lat` (float), `lon` (float), `radius` (float)
**Fields:**  
- `id` (integer): primary key of truck
- `distance` (float): distance from `lat`,`lon`
- `name` (string): name of truck and/or truck owner
- `type` (string): either "Truck", "Cart", or blank
- `address` (string): human-readable address of cart
- `food` (string): menu items supplied by cart owner
- `lat` (float): cart location latitude, in degrees
- `long` (float): cart location longitude, in degrees

### Examples:

**`GET /api/nearby?lat=37.7577&lon=-122.4376&radius=1.0`**  

**Response:**  

    [
        {
            "id": 10,
            "distance": 0.9307600007357155,
            "name": "BH & MT LLC",
            "type": "Truck",
            "address": "2001 MARKET ST",
            "food": "Cold Truck: Breakfast: Sandwiches: Salads: Pre-Packaged Snacks: Beverages",
            "lat": 37.7683202495106,
            "long": -122.427110643955
        },
        {
            "id": 12,
            "distance": 0.758291132766877,
            "name": "BH & MT LLC",
            "type": "Truck",
            "address": "2145 MARKET ST",
            "food": "Cold Truck: Breakfast: Sandwiches: Salads: Pre-Packaged Snacks: Beverages",
            "lat": 37.7666247727157,
            "long": -122.429511176347
        },
        {
            "id": 128,
            "distance": 0.8253260190316225,
            "name": "BH & MT LLC",
            "type": "Truck",
            "address": "3253 16TH ST",
            "food": "Cold Truck: Breakfast: Sandwiches: Salads: Pre-Packaged Snacks: Beverages",
            "lat": 37.7644595214424,
            "long": -122.425161376358
        },
        {
            "id": 217,
            "distance": 0.9307600007357155,
            "name": "BH & MT LLC",
            "type": "Truck",
            "address": "2001 MARKET ST",
            "food": "Cold Truck: Breakfast: Sandwiches: Salads: Pre-Packaged Snacks: Beverages",
            "lat": 37.7683202495106,
            "long": -122.427110643955
        },
        {
            "id": 300,
            "distance": 0.22721832354873622,
            "name": "Eva's Catering",
            "type": "Truck",
            "address": "1650 20TH AVE",
            "food": "Cold Truck: Burrito: Corn Dog: Salads: Sandwiches: Quesadilla: Tacos: Fried Rice: Cow Mein: Chinese Rice: Noodle Plates: Soup: Bacon: Eggs: Ham: Avacado: Sausages: Beverages",
            "lat": 37.7579841905286,
            "long": -122.433465780407
        },
        {
            "id": 378,
            "distance": 0.9498652457525618,
            "name": "The Chai Cart",
            "type": "Push Cart",
            "address": "560 VALENCIA ST",
            "food": "Hot Indian Chai",
            "lat": 37.7638580813603,
            "long": -122.422082620993
        }
    ]
