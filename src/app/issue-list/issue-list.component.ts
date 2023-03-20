import {Component, OnInit} from '@angular/core';
import {IssuesService} from "../services/issues.service";
import {Issue} from "../model/issue";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  // properties
  // it will toggle the appearance of the report issue form
  showMainContainer = true;
  showReportIssue = false;
  showConfirmDialog = false;
  showEditIssue = false;
  issues: Issue[] = [];
  selectedIssue: Issue | null = null;

  // IssuesService Injection
  constructor(private issueService: IssuesService) {
  }

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.showEditIssue = false;
    this.showMainContainer = true;
    this.selectedIssue = null;
    this.getIssues();
  }

  showResolveDialog(selectedIssue: Issue) {
    this.showConfirmDialog = true;
    this.selectedIssue = selectedIssue;
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.showConfirmDialog = false;
    this.selectedIssue = null;
  }

  onEdit(selectedIssue: Issue) {
    this.showMainContainer = false;
    this.showEditIssue = true;
    this.selectedIssue = selectedIssue;
  }

}
