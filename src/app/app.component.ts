import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { JsonretrieverService } from './service/jsonretriever.service';
import { FormControl } from '@angular/forms';
import { map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { City } from './model/city.model';
import { TableWeatherComponent } from './table-weather/table-weather.component';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	/**
	* Name of our app
	*/
	title = 'WeatherHelper';

	/**
	* Array with information of the cities
	*/
	private cities: City[] = [];

	/**
	* Table embedded
	*/
	@ViewChild('table') private table: TableWeatherComponent;

	/**
	* Form control for our input autocomplete field
	*/
	myControl: FormControl = new FormControl();

	/**
	* Observable with the array of cities, for each introduction of letter
	*/
	filteredCities: Observable<City[]>;

	/**
	* Constructor of the class, it injects our retriever of JSON list file
	* @param {JsonretrieverService} jsonRetriever - retriever of JSON list of cities file
	* @constructor
	*/
	constructor(private jsonRetriever: JsonretrieverService) {}

	/**
	* We call it at the beggining, first we get content of JSON file, and then we put it into
	* the autocomplete field
	*/
	ngOnInit(){
		this.parseCities();
		this.showInInput();
	}

	/**
	* Matches our introduced text into the field against the name of the cities
	* @param {string} val - value introduced, we need to pass either the value introduced as
	* the name of the city, and then check if it matches, then shows first 5 elements to not 
	* block out browser
	* @return {City[]} array resulted of cities
	*/
	private filter(val: string): City[] {
		return this.cities.filter(city =>
			city.name.toLowerCase().includes(val.toLowerCase())).slice(0,5);
	}

	private parseCities(){
		this.jsonRetriever.getJSON().subscribe((data: any) => {
			for (let i = 0; i < data.length; i++){
				var city = new City(data[i].id, data[i].name, data[i].country);
				this.cities.push(city);
			}
		}, 
		error => alert(error)); //Show the error to the user
	}

	/**
	* It gets our list of cities and filters it by setting it an observable into filteredCities 
	* in order to make the autocomplete field works, first of all checks if its an string and it's 
	* the name of the city, then filters it and shows the first 5 elements, we do so 
	* because if we let the program to get all the list even filtered we may block our browser
	*/
	private showInInput() : void{
		this.filteredCities = this.myControl.valueChanges
			.pipe(
				startWith<string | City>(''),
				map(value => typeof value === 'string' ? value : value.name),
				map(name => name ? this.filter(name) : this.cities.slice(0, 5))
			);
	}

	/**
	* It's triggered whenever we select a city, then we call to get forecast
	* @param {City} city - city selected
	*/
	private selectedCity(city): void{
		this.table.showForecast(city);
	}

	/**
	* In order to send the complete object instead of just the property "name" of the object
	* we need to call this function into html5 code
	* @param {City} city - city passed
	* @param {string | undefined} name of the city or undefined  
	*/
	public displayFn(city?: City): string | undefined {
		console.log(city ? city.name : undefined);
		return city ? city.name : undefined;
	}
}