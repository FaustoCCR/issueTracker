import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from "../model/issue";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssuesService} from "../services/issues.service";

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  @Input() issue: Issue | null = null;
  issueForm: FormGroup | undefined;
  @Output() formClose = new EventEmitter();

  constructor(private builder: FormBuilder,
              private issueService: IssuesService) {
  }

  ngOnInit(): void {
    if (this.issue) {
      this.issueForm = this.builder.group({
        title: [this.issue.title, Validators.required],
        description: [this.issue.description],
        priority: [this.issue.priority, Validators.required],
        type: [this.issue.type, Validators.required]
      })
    }
  }

  editIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    const issueNo = this.issue?.issueNo;
    this.issueService.editIssue({issueNo, ...this.issueForm?.value});
    this.formClose.emit();
  }
}
