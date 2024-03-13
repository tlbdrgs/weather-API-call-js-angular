import { Component, Output, EventEmitter, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule,MatButtonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  cityName: string = '';
  cityData: any[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  @Output() searchCity = new EventEmitter<{
    cityName: string;
    temperature: number;
    weatherDescription: string;
    date: string;
    hour: string;
    icon_code: string;
  }>();

  search() {

    const now = new Date();
    const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const hour = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const icon_code = '';

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
        const icon_code = response.current.condition.icon;
        console.log("icon code: " + icon_code);
        
        // Emit the city name, selected date, selected hour, temperature, and weather description to the parent component
      this.searchCity.emit({
        cityName: city,
        temperature: temperature,
        weatherDescription: response.current.condition.text,
        date: date,
        hour: hour,
        icon_code: icon_code
             });
      },
      error => {
        this.openErrorDialog();
      }
    );
  }
  openErrorDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: { message: 'Invalid City Name' }
    });
  }
}