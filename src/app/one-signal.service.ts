import { Injectable } from '@angular/core';
import { OneSignal } from 'onesignal-ngx';

@Injectable({
	providedIn: 'root'
})
export class OneSignalService {

	constructor(private OneSignal: OneSignal) { }

	onInit(): void {
		this.onLoad().then((OneSignal: any) => {
			OneSignal.init({
				appId: "0c98f95f-22d7-4722-ac93-41709ad00ff8"
			});
		});
	}

	async onLoad(): Promise<any> {
		// window.OneSignal = window.OneSignal || [];
		// return new Promise((resolve) => {
		// 	window.OneSignal.push(function () {
		// 		resolve(window.OneSignal);
		// 	});
		// });
		let OneSignal: any = this.OneSignal || [];
		return new Promise((resolve) => {
			OneSignal.push(() => {
				resolve(OneSignal);
			});
		});
	}
}
