import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

	@Input() viewModal: boolean;
	@Output() sendValue: EventEmitter<boolean> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	openConfirmModal() {
		this.viewModal = true;
		this.sendValue.emit(true);
	}

	// closeConfirmModal() {
	// 	this.viewModal = false;
	// 	this.sendValue.emit(false);
	// 	$('#confirmReceiptModal').modal('hide');
	// }

	// closeAllModals() {
	// 	this.viewModal = false;
	// 	this.sendValue.emit(false);
	// 	$('#confirmReceiptModal').modal('hide');
	// 	$('#viewReceiptModal').modal('hide');
	// }

}
