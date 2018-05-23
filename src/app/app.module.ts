import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { JsonretrieverService } from './service/jsonretriever.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {
	MatAutocompleteModule, MatInputModule, MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableWeatherComponent } from './table-weather/table-weather.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    TableWeatherComponent,
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	MatAutocompleteModule,
	ReactiveFormsModule,
	BrowserModule,
	FormsModule,
	MatInputModule,
	MatNativeDateModule,
	BrowserAnimationsModule,
	MatTableModule,
	  MatProgressSpinnerModule
  ],
  providers: [JsonretrieverService],
  bootstrap: [AppComponent]
})

export class AppModule {}

