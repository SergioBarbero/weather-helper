export class Forecast {

	constructor(
		private time: string,
		private img: string,
		private description: string,
		private temperature: string,
		private pressure: string,
		private humidity: string,
		private wind: string
	){}
}