import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
declare var $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

	invoiceNumber: any = null;
	vtForm: FormGroup;
	public regEx = /[0-9a-zA-Z]+$/i;
	public matcher = new MyErrorStateMatcher();

	constructor(
		public _formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.vtForm = this._formBuilder.group({
			invoiceNumber: new FormControl('', [Validators.maxLength(20), Validators.pattern(this.regEx)])
		});
	}

	closeConfirmModal() {
		$('#confirmReceiptModal').modal('hide');
	}

	closeAllModals() {
		$('#confirmReceiptModal').modal('hide');
		$('#viewReceiptModal').modal('hide');
	}

	alphaNumericOnly(e?: any) {  // Accept only alpha numerics, not special characters 
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

		// var regex = new RegExp("^[0-9a-zA-Z]+", 'i');
		// if (regex.test(str)) {
		// 	return true;
		// }

		if (str.match(this.regEx)) {
			return true;
		}

		e.preventDefault();
		return false;
	}

	onPaste(e?: any) {
		e.preventDefault();
		return false;
	}

	onSubmit() {
		console.log('invoice number isss:', this.invoiceNumber);
	}

}
