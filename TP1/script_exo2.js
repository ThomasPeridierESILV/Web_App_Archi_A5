'use strict';

function load2()
{
	var display = document.getElementById('text2');
	display.innerHTML = "";
	var data = {
	  "cars": [
	    {
	      "id": "p306",
	      "vehicule": "peugeot 306",
	      "pricePerDay": 20,
	      "pricePerKm": 0.10
	    }
	  ],
	  "rentals": [
	    {
	      "id": "1-pb-92",
	      "driver": {
	        "firstName": "Paul",
	        "lastName": "Bismuth"
	      },
	      "carId": "p306",
	      "pickupDate": "2015-09-12",
	      "returnDate": "2015-09-12",
	      "distance": 100
	    },
	    {
	      "id": "2-rs-92",
	      "driver": {
	        "firstName": "Rebecca",
	        "lastName": "Solanas"
	      },
	      "carId": "p306",
	      "pickupDate": "2015-09-10",
	      "returnDate": "2015-09-15",
	      "distance": 300
	    },
	    {
	      "id": "3-sa-92",
	      "driver": {
	        "firstName": " Sami",
	        "lastName": "Ameziane"
	      },
	      "carId": "p306",
	      "pickupDate": "2015-08-31",
	      "returnDate": "2015-09-13",
	      "distance": 1000
	    }
	  ]
	}
	var cars = data.cars;
	var rentals = data.rentals;

	for (var i = 0; i < rentals.length; i++) {
		var rental = rentals[i];
		var distance = rental.distance;
		var firstDay = new Date(rental.pickupDate);
		var lastDay = new Date(rental.returnDate);
		var nbDay = ((lastDay.getTime() - firstDay.getTime()) / 86400000)+1;
		var idCar = rental.carId;
		var firstname = rental.driver.firstName;
		var name = rental.driver.lastName;

		for (var j = 0; j < cars.length; j++) {
			var car = cars[j];
			if(car.id == idCar)
			{
				var vehicule = car.vehicule;
				var finalPrice = CalculPrice(car, distance, nbDay);
				rental.price = finalPrice;
				//alert(totalPrice);
				display.innerHTML += "<tr><td>" + firstname + "</td><td>" + name + "</td><td>" + vehicule + "</td><td>" + finalPrice + "</td></tr>";
			}
		};
	};
	
};
function CalculPrice(car, distance, nbDay)
{
	var priceDay;
	var priceDistance;
	var finalPrice;
	if(nbDay == 1)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay;
		finalPrice = priceDay+priceDistance;
	}
	else if(nbDay>=2 && nbDay <5)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay + (nbDay-1)*(car.pricePerDay  - (car.pricePerDay /100)*10);
		finalPrice = priceDay+priceDistance;
	}
	else if(nbDay>=5 && nbDay <11)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay + 3*(car.pricePerDay  - (car.pricePerDay /100)*10) + (nbDay-4)*(car.pricePerDay  - (car.pricePerDay /100)*30);
		finalPrice = priceDay+priceDistance;
	}
	else
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay + 3*(car.pricePerDay  - (car.pricePerDay /100)*10) + 6*(car.pricePerDay  - (car.pricePerDay /100)*30) + (nbDay-10)*(car.pricePerDay  - (car.pricePerDay /100)*50);
		finalPrice = priceDay+priceDistance;
	}
	return finalPrice;
};