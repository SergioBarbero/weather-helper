import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

/**
* @author Sergio Barbero Bascones 
* Service dedicated to get JSON files, in our case the list of cities
*/
@Injectable()
export class JsonretrieverService {

	/** 
	* Constructor of my class, it injects HttpClient in order to make requests to the server
	* @constructor 
	*/
	constructor(private http: HttpClient) {}

	/**
	* Link to our file
	*/
	private jsonFileUrl = "assets/city.list.json";

	/**
	* It makes the GET request
	* we are going to get it through id in order to get unambiguous results
	* @return {Observable<any>} Observable with array of cities
	*/
	public getJSON() : Observable<any> {
		return this.http.get<any>(this.jsonFileUrl).pipe(catchError(this.handleError));
	}

	/**
	* It handles an error if needed
	* @param {HttpErrorResponse} error - Error handled
	*/
	private handleError(error: HttpErrorResponse) {
		return throwError(
			'Error: Couldn\'t get cities');
	};
}