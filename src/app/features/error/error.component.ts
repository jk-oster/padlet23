import { Component, Input } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {AssocArray} from "../../shared/assoc-array";

@Component({
  selector: 'tw-error',
  templateUrl: './error.component.html',
  styles: [
  ]
})
export class ErrorComponent {
  @Input() controlName: string = '';
  @Input() form: FormGroup = new FormGroup({});

  get control(): AbstractControl {
    // @ts-ignore
    return this.form.get(this.controlName);
  }

  get errors(): string[] {
    const errors: string[] = [];
    const controlErrors = this.control.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach((key) => {
        errors.push(this.getErrorMsg(key, controlErrors[key]));
      });
    }
    return errors;
  }

  private getErrorMsg(key: string, value: any): string {
    const errorMessages: AssocArray = {
      required: `${this.controlName} is required.`,
      email: `${this.controlName} must be a valid email.`,
      pattern: `${this.controlName} is not valid.`,
      minlength: `${this.controlName} must be at least ${value.requiredLength} characters long.`,
      maxlength: `${this.controlName} cannot be more than ${value.requiredLength} characters long.`,
      min: `${this.controlName} must be greater than or equal to ${value.min}.`,
      max: `${this.controlName} must be less than or equal to ${value.max}.`,
    };
    return errorMessages[key] ?? 'Unknown form input error!';
  }
}
