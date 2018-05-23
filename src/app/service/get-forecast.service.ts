import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { City } from '../model/city.model';
import { Forecast } from '../model/forecast.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
* @author Sergio Barbero Bascones 
* Service dedicated to get Forecast data from GET method, we should inject it 
* wherever we want to get the data in
* it also manages errors ocurred with the retrieving
*/
export class GetForecastService {

	/**
	* Url from we will get JSON data
	*/
	private baseUrlGet = 'http://api.openweathermap.org/data/2.5/forecast?id=';

	/**
	* API key associated to my account into openweathermap
	*/
	private apiKey = '74e4f3c9069308ea3cd47748962c4269';

	/**
	* Constructor of my class, it injects HttpClient in order to make requests to the server
	* @constructor 
	*/
	constructor(private http: HttpClient) { }

	/**
	* It makes the GET request for a given city, 
	* we are going to get it through id in order to get unambiguous results
	* @param {City} city - city given
	* @return {Observable<Forecast[]>} Observable with array of forecast
	*/
	public getForecast(city: City) : Observable<Forecast[]>{
		var finalUrl = this.baseUrlGet + city.id + "&APPID=" + this.apiKey;
		return this.http.get<any>(finalUrl).pipe(catchError(this.handleError));
	}

	/**
	* It handles an error if needed
	* @param {HttpErrorResponse} error - Error handled
	*/
	private handleError(error: HttpErrorResponse){
		return throwError('Error: Couldn\'t get forecast data');
	}
}
