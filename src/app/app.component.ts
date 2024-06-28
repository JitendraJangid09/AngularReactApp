import { Component, OnChanges, ElementRef, ViewChild, AfterViewInit, input, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as React from "react";
import * as ReactDOM from 'react-dom';

import RegistrationForm from "./RegistrationForm"
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  
  @ViewChild("reactContainer", {static: true}) reactContainer !: ElementRef;
  @Input() isSubmitClicked: boolean = false;

  receivedData: any;

  constructor(private sharedService: SharedService) {}


  ngAfterViewInit(): void {
    const sendDataToAngular = (data: any) => {
      this.receivedData = data
    }

    ReactDOM.render(
      React.createElement(RegistrationForm, { 
        onSendDataToAngular: sendDataToAngular,
        isSubmitClicked: this.isSubmitClicked
      }),
      this.reactContainer.nativeElement
    )


  }

  onSubmit() {
    const dataToSend = { message: 'Hello from Angular!' };
    this.sharedService.sendData(dataToSend);
  }
}
