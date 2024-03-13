import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SearchBarComponent,FormsModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  city: string = '';
  date: string = '';
  hour: string = '';
  temperature: number = 0;
  weatherDescription: string = '';
  icon_code: string = '';

  // Event handler for when data is emitted from SearchBarComponent
  handleSearch(event: { cityName: string; temperature: number; weatherDescription: string; date: string; hour: string; icon_code: string }) {
    this.city = event.cityName;
    this.temperature = event.temperature;
    this.weatherDescription = event.weatherDescription;
    this.date = event.date;
    this.hour = event.hour;
    this.icon_code = event.icon_code;
  }

  getCurrentDateTime() {
    const now = new Date();
    this.date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    this.hour = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }
  
}
