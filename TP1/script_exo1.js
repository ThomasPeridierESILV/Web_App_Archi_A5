'use strict';

function load1()
{
	var affichage = document.getElementById('texte');
	affichage.innerHTML = "";
	var data = { 
		"cars": [
	    {
	      "id": "p306",
	      "vehicule": "peugeot 306",
	      "pricePerDay": 20,
	      "pricePerKm": 0.10
	    },
	    {
	      "id": "rr-sport",
	      "vehicule": "renault sport",
	      "pricePerDay": 60,
	      "pricePerKm": 0.30
	    },
	    {
	      "id": "p-boxster",
	      "vehicule": "peugeot boxster",
	      "pricePerDay": 100,
	      "pricePerKm": 0.45
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
	      "returnDate": "2015-09-14",
	      "distance": 150
	    },
	    {
	      "id": "2-rs-92",
	      "driver": {
	        "firstName": "Rebecca",
	        "lastName": "Solanas"
	      },
	      "carId": "rr-sport",
	      "pickupDate": "2015-09-09",
	      "returnDate": "2015-09-13",
	      "distance": 550
	    },
	    {
	      "id": "3-sa-92",
	      "driver": {
	        "firstName": " Sami",
	        "lastName": "Ameziane"
	      },
	      "carId": "p-boxster",
	      "pickupDate": "2015-09-12",
	      "returnDate": "2015-09-14",
	      "distance": 100
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
				var priceDay = nbDay*car.pricePerDay;
				var priceDistance = distance*car.pricePerKm;
				var totalPrice =priceDay+priceDistance;
				//alert(totalPrice);
				rental.price = totalPrice;
				//affichage.innerHTML += firstname + ' ' + name + ' a loué un(e) ' + vehicule + ' pour un prix total de ' + totalPrice + '€.' + '<br>';
				affichage.innerHTML += "<tr><td>" + firstname + "</td><td>" + name + "</td><td>" + vehicule + "</td><td>" + totalPrice + "</td></tr>";
			}
		};
	};
	
};