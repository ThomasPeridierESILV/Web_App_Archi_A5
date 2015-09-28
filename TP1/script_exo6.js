'use strict';

function load6()
{
	var display = document.getElementById('text6');
	var display2 = document.getElementById('text7');
	display.innerHTML = "";
	display2.innerHTML = "";
	var data =  {
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
	  ],
	  "rentalModifications": [
	    {
	      "id": 1,
	      "rentalId": "1-pb-92" ,
	      "end_date": "2015-09-13",
	      "distance": 150
	    },
	    {
	      "id": 2,
	      "rentalId": "3-sa-92",
	      "pickupDate": "2015-09-01"
	    }
	  ]
	}

	var cars = data.cars;
	var rentals = data.rentals;
	var modifs = data.rentalModifications;
	display.innerHTML += 'RENTALS DISPLAY : <br>'
	display2.innerHTML += '<br>MODIFICATIONS : <br>'
	for (var i = 0; i < rentals.length; i++) {
		var rental = rentals[i];
		var distance = rental.distance;
		var nbDay = CalculNbDay(rental.pickupDate, rental.returnDate);
		var idCar = rental.carId;

		for (var j = 0; j < cars.length; j++) {
			var car = cars[j];
			if (car.id == idCar)
			{				
				CalculEverything(rental, car, nbDay, distance);
				display.innerHTML += DisplayRental(rental,nbDay);
			}
		};

		for (var k = 0; k < modifs.length; k++) {
			var modif = modifs[k];
			if (modif.rentalId == rental.id)
			{
				if (modif.id == 1)
				{
					nbDay = CalculNbDay(rental.pickupDate, modif.end_date);
					CalculEverything(rental, car, nbDay, modif.distance);
					display2.innerHTML += DisplayRental(rental,nbDay);
				}
				if (modif.id == 2)
				{
					nbDay = CalculNbDay(modif.pickupDate, rental.returnDate);
					CalculEverything(rental, car, nbDay, rental.distance);
					display2.innerHTML += DisplayRental(rental,nbDay);
				}
			}
		};
		console.log(rental);
	};	
};

function CalculNbDay(begin, end)
{
	var firstDay = new Date(begin);
	var lastDay = new Date(end);	
	return ((lastDay.getTime() - firstDay.getTime()) / 86400000)+1;
}

function CalculEverything(rental, car, nbDay, distance)
{
	var finalPrice = CalculPrice(car, distance, nbDay, rental.options.deductibleReduction);
	rental.price = finalPrice;
	var Commission = CalculCommission(finalPrice,nbDay);
	rental.commission = new Object();
	rental.commission.insurance = Commission.insurance;
	rental.commission.assistance = Commission.assistance;
	rental.commission.drivy = Commission.drivy;
}

function DisplayRental(rental, nbDay)
{	
	var displayStr = 'rental : ' + rental.id + '<br>';
	var arrayAction = new Array();
	displayStr += 'The driver ' + rental.driver.firstName + ' ' + rental.driver.lastName + ' pay ' + rental.price + ' (DEBIT) <br>';
	FillRentalActions(arrayAction,'driver','DEBIT',rental.price);
	var ownerReceiving = rental.price - ((rental.price*30)/100);
	displayStr += 'The owner receive ' + ownerReceiving  + ' (CREDIT) <br>';
	FillRentalActions(arrayAction,'owner','CREDIT',ownerReceiving);
	displayStr += 'The insurance receive ' + rental.commission.insurance + ' (CREDIT) <br>';
	FillRentalActions(arrayAction,'insurance','CREDIT',rental.commission.insurance);
	displayStr += 'The roadside assistance receive ' + rental.commission.assistance + ' (CREDIT) <br>';
	FillRentalActions(arrayAction,'assistance','CREDIT',rental.commission.assistance);
	displayStr += 'Drivy receive its part of commission : ' + rental.commission.drivy + ' (CREDIT) <br>';
	
	if (rental.options.deductibleReduction == false)
	{
		displayStr += 'With a deductible option of 800 (CREDIT) <br><br>';
		FillRentalActions(arrayAction,'drivy','CREDIT',rental.commission.drivy+800);
	}
	else
	{
		var deductible = 150 + nbDay*4;
		displayStr += 'With a deductible option of ' + deductible + ' (CREDIT) <br><br>';
		FillRentalActions(arrayAction,'drivy','CREDIT',rental.commission.drivy+deductible);
	}
	rental.actions = new Object();
	rental.actions = arrayAction;
	return displayStr;
}

function FillRentalActions(_array,_who,_type,_amount)
{
	var actions = new Object();
	actions.who = _who;
	actions.type = _type;
	actions.amount = _amount;
	_array.push(actions);
}

function CalculCommission(finalprice, nbDay)
{
	var Commission = new Object();
	var price = (finalprice*30)/100
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
	var reductionPrice = 800;
	if (reduction == true)
	{
		reductionPrice = nbDay*4 + 150;
	}
	if (nbDay == 1)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay;
		finalPrice = priceDay+priceDistance+reductionPrice;
	}
	else if (nbDay >= 2 && nbDay < 5)
	{
		priceDistance = distance*car.pricePerKm;
		priceDay = car.pricePerDay + (nbDay-1)*(car.pricePerDay  - (car.pricePerDay /100)*10);
		finalPrice = priceDay+priceDistance+reductionPrice;
	}
	else if (nbDay >= 5 && nbDay < 11)
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