import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { Utilities } from '../../services/utilities';
import { AreaService } from '../../services/area-service.service';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  columns: any[] = [];
  rows: Area[] = [];
  rowsCache: Area[] = [];
  editing = {};
  areaEdit: any = {};
  loadingIndicator: boolean;
  formResetToggle = true;
  _hideCompletedTasks = false;

  @ViewChild('indexTemplate', { static: true })
  indexTemplate: TemplateRef<any>;

  @ViewChild('userNameTemplate', { static: true })
  userNameTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;

  constructor(private alertService: AlertService, private translationService: AppTranslationService, private areaService: AreaService) { }

  ngOnInit(): void {
    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      { prop: 'index', name: '#', width: 40, cellTemplate: this.indexTemplate, canAutoResize: false },
      { prop: 'areaCode', name: gT('areas.management.AreaCode'), width: 50 },
      { prop: 'areaDesc', name: gT('areas.management.AreaDesc'), width: 90, cellTemplate: this.userNameTemplate }
    ];

    this.loadData();
  }

  onSearchChanged(value: string) {
    /*
    this.rows = this.rowsCache.filter(r =>
      Utilities.searchArray(value, false, r.name, r.description) ||
      value === 'important' && r.important ||
      value === 'not important' && !r.important);
    */
  }

  set hideCompletedTasks(value: boolean) {

    if (value) {
      /*
      this.rows = this.rowsCache.filter(r => !r.completed);
    } else {
      this.rows = [...this.rowsCache];
      */
    }
    this._hideCompletedTasks = value;
  }
  get hideCompletedTasks() {
    return this._hideCompletedTasks;
  }

  addTask() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;

      this.areaEdit = {};
      this.editorModal.show();
    });
    
  }

  save() {
    alert("Hello!");
    this.rowsCache.splice(0, 0, this.areaEdit);
    this.rows.splice(0, 0, this.areaEdit);
    this.refreshDataIndexes(this.rowsCache);
    this.rows = [...this.rows];

    this.saveToDisk();
    this.editorModal.hide();
  }

  loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.areaService.getAreas().subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));

  }

  onDataLoadSuccessful(areas: Area[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    areas.forEach((area, index) => {
      (area as any).index = index + 1;
    });

    this.rowsCache = [...areas];
    this.rows = areas;
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve topics from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

  refreshDataIndexes(data) {
    let index = 0;

    for (const i of data) {
      i.$$index = index++;
    }
  }

  saveToDisk() {
    this.loadingIndicator = true;
    this.areaService.saveAreas(this.areaEdit).subscribe(results => this.onDataLoadSuccessful(results), error => this.onDataLoadFailed(error));
    this.loadingIndicator = false;
  }

}
