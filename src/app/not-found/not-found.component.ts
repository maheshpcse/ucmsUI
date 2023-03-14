import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CommonService } from '../api-services/common.service';
import { ErrorStateMatcher } from '@angular/material';
import { Observable, of, Subscription } from 'rxjs';
import { map, startWith, takeUntil, debounceTime, distinctUntilChanged, switchMap, filter, } from 'rxjs/operators';
declare var $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

export interface User {
	name: string;
}

export interface Author {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	birthdate: string;
	added: string;
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

	public myControl: any = new FormControl();
	// public options: User[] = [
	// 	{name: 'Mary'},
	// 	{name: 'Shelley'},
	// 	{name: 'Igor'}
	// ];
	public newData: any = [];
	public authors: Author[] = [];
	public filteredOptions: Author[] = [];

	constructor(
		public _formBuilder: FormBuilder,
		private commonService: CommonService
	) { }

	ngOnInit() {
		this.vtForm = this._formBuilder.group({
			invoiceNumber: new FormControl('', [Validators.maxLength(20), Validators.pattern(this.regEx)])
		});

		// this.getFiterData();
	}

	// Start: Autocomplete
	getFiterData() {
		this.filteredOptions = this.myControl.valueChanges
			.pipe(
				startWith(''),
				map((value?: any) => typeof value === 'string' ? value : value.first_name),
				map((first_name?: any) => first_name ? this._filter(first_name) : this.authors.slice())
			);
	}

	autoCompleteChange(event?: any) {
		this.myControl.valueChanges.pipe(
			debounceTime(400),
			// ignore search terms that have less than 2 characters, also handling stripping out whitepsaces
			filter((searchTerm: string) => searchTerm.trim().length > 2),
			distinctUntilChanged(),
			switchMap((searchTerm: string) => {
				// now we switch observables to your service. i.e. "switchmap)
				// switchmap handles cancelling the previous pending request for the new one. ensuring the user doesn't see old data as they typehead
				return this.commonService.getTestAuthorsData({ limit: 100, page: 1, search_query: searchTerm });
			})
		).subscribe({
			next: (result?: any) => {
				// at this point, you have your 'items' array returned.
				// you can store it where you like
				console.log('result isss:', result);
				this.filteredOptions = result['data'] || [];
				this.authors = result['data'] || [];
			}
		});
	}

	displayFn(author?: Author): string | undefined {
		return author ? author.first_name : undefined;
	}

	private _filter(first_name: string): Author[] {
		const filterValue = first_name.toLowerCase();

		return this.authors.filter((author?: any) => author.first_name.toLowerCase().indexOf(filterValue) === 0);
	}
	// End: Autocomplete

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
