import { Component, Output, EventEmitter, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  cityName: string = '';
  cityData: any[] = [];

  constructor(private http: HttpClient) {
  }

  @Output() searchCity = new EventEmitter<{
    cityName: string;
    temperature: number;
    weatherDescription: string;
    date: string;
    hour: string;
  }>();

  search() {

    const now = new Date();
    const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const hour = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Make a GET request to WeatherAPI.com endpoint
    const apiKey = 'd6a04d037d914b8881f135006241203'; // Replace with your WeatherAPI.com API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.cityName}`;
    
    this.http.get<any>(apiUrl)
    .subscribe(
      response => {
        // Extract relevant weather information from the response
        const city = response.location.name;
        const temperature = response.current.temp_c;
        const weatherDescription = response.current.condition.text;
        
        // Emit the city name, selected date, selected hour, temperature, and weather description to the parent component
      this.searchCity.emit({
        cityName: city,
        temperature: temperature,
        weatherDescription: response.current.condition.text,
        date: date,
        hour: hour
             });
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}