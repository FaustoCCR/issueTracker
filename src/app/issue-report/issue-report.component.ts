import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssuesService} from "../services/issues.service";

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  /*
  We need to notify IssueListComponent to reflect the change in the table
  when we add a new issue with our IssueReportComponent
  */
  @Output() formClose = new EventEmitter();

  issueForm: FormGroup | undefined;

  constructor(private builder: FormBuilder,
              private  issueService: IssuesService) { }

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  addIssue(){

    if (this.issueForm && this.issueForm.invalid){
      this.issueForm.markAllAsTouched();
      // to mark all control as touched
      // This makes validation messages appear automatically
      return;
    }
    this.issueService.createIssue(this.issueForm?.value);
    this.formClose.emit(); //call the emit method
  }

}
