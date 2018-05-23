import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetForecastService } from '../service/get-forecast.service';
import { Forecast } from '../model/forecast.model';
import { City } from '../model/city.model';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-table-weather',
  templateUrl: './table-weather.component.html',
  styleUrls: ['./table-weather.component.css']
})

/**
* @author Sergio Barbero Bascones 
* Component which shows the table, the spinner and shows errors if 
* something happened with the received data
*/
export class TableWeatherComponent implements OnInit {

	/**
	* Reference to datasource
	*/
	private weather = new MatTableDataSource<Forecast>();
	/**
	* It tells us if the table is empty or not
	*/
	public empty = true;

	/**
	* It tells us if the spinner loader is currently working
	*/
	public showSpinner = false;

	/**
	* Array with headers of our table
	*/
	displayedColumns = ['Time', 'Description', 'Temperature', 'Preassure', 'Humidity', 'Wind'];

	/**
	* Constructor of our class, we inject the service in order to get forecast data
	* @constructor 
	* @param {GetForecastService} forecastRetriever - Retriever of data
	*/
	constructor(private forecastRetriever: GetForecastService) {}

	ngOnInit() {}

	/**
	* It's triggered whenever we select a city
	* @param {City} city - City we selected
	*/
	public showForecast(city: City): void {
		this.swichOnSpinner();
		 this.forecastRetriever.getForecast(city).subscribe((data: any) => {
			var processed = new Array();
			var listWeather = data.list;
			for (var i = 0; i < listWeather.length; i++) {
				var date = moment(listWeather[i].dt * 1000).format('HH:mm MM-DD') + " UTC";
				var iconLink = 'http://openweathermap.org/img/w/' + listWeather[i].weather[0].icon + ".png"; //Link icon
				var temp = Math.floor(listWeather[i].main.temp - 273.15) + "ºC"; //In order to get Celsius
				processed.push(new Forecast(
					date,
					iconLink,
					listWeather[i].weather[0].description,
					temp,
					listWeather[i].main.grnd_level + " hPa",
					listWeather[i].main.humidity + "%",
					listWeather[i].wind.speed + " m/s")
				);
			}
			this.setWeatherData(processed);
			this.setEmpty(false);
			this.swichOffSpinner();
		}, error => alert(error)); //Save the error
	}

	/**
	* Set method, it establishes our spinner to false in order to hide it
	*/
	public swichOffSpinner(): void{
		this.showSpinner = false;
	}

	/**
	* Set method, it establishes our spinner to true in order to show it
	*/
	public swichOnSpinner(): void {
		this.showSpinner = true;
	}

	/**
	* Set method, it establishes our empty parameter to a boolean introduced
	* @param {boolean} empty - tells if it's empty or not
	*/
	public setEmpty(empty : boolean): void{
		this.empty = empty;
	}

	/**
	* Set method, it establishes our weather data into the table
	* @param {Forecast[]} data - Array of forecasts to introduce
	*/
	public setWeatherData(data: Forecast[]): void{
		this.weather.data = data;
	}
}
