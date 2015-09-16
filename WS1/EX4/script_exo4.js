'use strict';

function load()
{
	var display = document.getElementById('text');
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
	      "distance": 100,
	      "options":{
	        "deductibleReduction": false
	      }
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
	      "distance": 300,
	      "options":{
	        "deductibleReduction": true
	      }
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
	      "distance": 1000,
	      "options":{
	        "deductibleReduction": true
	      }
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
				var finalPrice = CalculPrice(car, distance, nbDay, rental.options.deductibleReduction);
				rental.price = finalPrice;
				var Commission = CalculCommission(finalPrice,nbDay);
				rental.commission = new Object();
				rental.commission.insurance = Commission.insurance;
				rental.commission.assistance = Commission.assistance;
				rental.commission.drivy = Commission.drivy;

				display.innerHTML += firstname + ' ' + name + ' rented a ' + vehicule + ' with a total price of ' + finalPrice + '€.' + 'The Commission was divided in 3 parts : ' + '<br>' + 'The insurance : ' + Commission.insurance + '€ ; The Roadside assistance : ' + Commission.assistance + '€ ; Drivy s part : ' + Commission.drivy + '€. <br>';
			}
		};
		console.log(rental);
	};
	
};

function CalculReduction(reduction, nbDay)
{

	return reductionPrice;
};

function CalculCommission(price, nbDay)
{
	var Commission = new Object();
	Commission.insurance = price/2;
	Commission.assistance = nbDay;
	Commission.drivy = Commission.insurance - Commission.assistance;
	return Commission;
};

function CalculPrice(car, distance, nbDay, reduction)
{
	var priceDay;
	var priceDistance;
	var finalPrice;
	var reductionPrice = 0;
	if(reduction == true)
	{
		reductionPrice = nbDay*4;
	}
	if(nbDay == 1)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay;
		finalPrice = priceDay+priceDistance+reductionPrice;
	}
	else if(nbDay>=2 && nbDay <5)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay + (nbDay-1)*(car.pricePerDay  - (car.pricePerDay /100)*10);
		finalPrice = priceDay+priceDistance+reductionPrice;
	}
	else if(nbDay>=5 && nbDay <11)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay + 3*(car.pricePerDay  - (car.pricePerDay /100)*10) + (nbDay-4)*(car.pricePerDay  - (car.pricePerDay /100)*30);
		finalPrice = priceDay+priceDistance+reductionPrice;
	}
	else
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay + 3*(car.pricePerDay  - (car.pricePerDay /100)*10) + 6*(car.pricePerDay  - (car.pricePerDay /100)*30) + (nbDay-10)*(car.pricePerDay  - (car.pricePerDay /100)*50);
		finalPrice = priceDay+priceDistance+reductionPrice;
	}
	return finalPrice;
};