import { Component, OnInit } from '@angular/core';
// import { OneSignalService } from './one-signal.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'ucmsUI';

	// constructor(private os: OneSignalService) {}
	constructor() {}

	ngOnInit(): void {
		// this.os.onInit();
	}
}
