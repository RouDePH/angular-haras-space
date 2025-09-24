import { Component, input, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from './question-base';
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  imports: [ReactiveFormsModule],
})
export class DynamicFormQuestionComponent {
  readonly question = input.required<QuestionBase<string>>();
  readonly form = input.required<FormGroup>();
  get isValid() {
    return this.form().controls[this.question().key].valid;
  }

  get errorMessage() {
    return JSON.stringify(this.form().controls[this.question().key].errors);
  }
}
