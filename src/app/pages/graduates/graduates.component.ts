import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Graduate} from '../../models/graduate';
import {NgForm} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as _ from 'lodash';
import {HttpDataService} from '../../services/http-data.service';

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.css']
})
export class GraduatesComponent implements OnInit, AfterViewInit {
  @ViewChild('studentForm', { static: false })
  studentForm: NgForm;
  studentData: Graduate;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'year', 'sex', 'Course', 'Graduates'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isEditMode = false;

  constructor(private httpDataService: HttpDataService) {
    this.studentData = {} as Graduate;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getAllStudents();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllStudents(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  editItem(element): void {
    console.log(element);
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }
  cancelEdit(): void {
    this.isEditMode = false;
    this.studentForm.resetForm();
  }
  deleteItem(id): void {
    this.httpDataService.deleteItem(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Graduate) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }
  addStudent(): void {
    const newStudent = {year: this.studentData.year, sex: this.studentData.sex, Course: this.studentData.Course};
    this.httpDataService.createItem(newStudent).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map(o => o);
    });
  }
  updateStudent(): void {
    this.httpDataService.updateItem(this.studentData.id, this.studentData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((o: Graduate) => {
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
        this.cancelEdit();
      });
  }
  onSubmit(): void {
    if (this.studentForm.form.valid) {
      if (this.isEditMode) {
        this.updateStudent();
      } else {
        this.addStudent();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
