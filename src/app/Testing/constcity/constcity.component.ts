import { Component, OnInit,ElementRef, VERSION, ViewChild  } from '@angular/core';
import { Country, State, City }  from 'country-state-city';

@Component({
  selector: 'app-constcity',
  templateUrl: './constcity.component.html',
  styleUrls: ['./constcity.component.css']
})
export class ConstcityComponent {
  
  

  @ViewChild('country')
  countryNew!: ElementRef; 
  
  @ViewChild('city')
  cityNew!: ElementRef; 
  
  @ViewChild('state')
  stateNew!: ElementRef;
  

  name = 'Angular ' + VERSION.major;
  Newcountries = Country.getAllCountries();
  Newstates : any;
  Newcities  : any;

  selectedCountry: any;
  selectedState:any;
  selectedCity:any;
  

  onCountryChange($event:any): void {
    this.Newstates= State.getStatesOfCountry(JSON.parse(this.countryNew.nativeElement.value).isoCode);
    this.selectedCountry = JSON.parse(this.countryNew.nativeElement.value);
    this.Newcities = this.selectedState = this.selectedCity = null;
  }

  onStateChange($event : any): void {
    this.Newcities = City.getCitiesOfState(JSON.parse(this.countryNew.nativeElement.value).isoCode, JSON.parse(this.stateNew.nativeElement.value).isoCode)
    this.selectedState = JSON.parse(this.stateNew.nativeElement.value);
    this.selectedCity = null;

  }

  onCityChange($event : any): void {
    this.selectedCity = JSON.parse(this.cityNew.nativeElement.value)
  }

  
}
