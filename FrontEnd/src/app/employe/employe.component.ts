import { Student } from './../student';

import { EmployesService } from './../employes.service';

import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent {
  Emplist: any[]=[];
  NewEmploye:Student= new Student();
  EditEmploye:Student= new Student();
  url:any;
  totalItems:any;
  filterText = '';
  pageSize: number = 10;
  availablePageSizes: number[] = [5,10,15, 20,25,30,35,40,45, 50, 100];
  selectedPageSize: number = 5;
  currentPage = 1;
   totalPages:number=50
  sortColumn: string = '';
sortDirection: string = 'asc';
filteredData: any[] = [];
originalEmplist:any;
  filterQuery: any = {};
  filterQueryChanged: any[]=[];
  constructor(private Empservice : EmployesService,private filterPipe: FilterPipe){
    this.getStudents();
  }

  ngOnInit(): void {
    
    this.getStudents();
    
   
  }
  
  getStudents() {
    debugger
    this.Empservice.getStudentsByPage(this.currentPage, this.selectedPageSize)
    .subscribe((response: any) => {
    
      this.Emplist = response;
      this.originalEmplist=this.Emplist;

    });
  }


//   onselected(event: any): void {
//   const file: File = event.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = (event:any) => {
//     this.url=event.target.result;
//     const base64String: string = reader.result as string;
//     this.NewEmploye.picture= base64String
//     this.EditEmploye.picture=base64String
    
    
//   };
// }


  // getALL()
  // {
    

  //   this.Empservice.GetEmployes().subscribe(
  //     (respnse)=>{
  //       this.Emplist=respnse
  //       this.filteredList = this.Emplist;
       
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )
  // }

 

  onPageChange(event: any) {
    this.currentPage = event;
  }


  applyFilters() {
    debugger
    if (this.filterQuery) {
      this.Emplist = this.filterPipe.transform(this.originalEmplist, this.filterQuery);
      this.filterQueryChanged = this.filterPipe.transform(this.originalEmplist, this.filterQuery);
    } 
    else {
      this.Emplist = [...this.originalEmplist];
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getStudents();
    }
  }

  nextPage() {
    debugger
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getStudents();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getStudents();
    }
  }

  // get totalPages(): number {
  //   return Math.ceil(this.totalItems / this.pageSize);
  // }
  
  changePageSize() {
  this.currentPage = 1;
  this.pageSize = this.selectedPageSize;
 
  this.getStudents();
}

  sortData(column: string) {
    debugger
    if (this.sortColumn === column) {
   
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
     
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  
    this.Emplist.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
  
      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  
  
  
  Save()
  {
    
    this.Empservice.saveEmployes(this.NewEmploye). subscribe(
      (response)=>{
       
        this.NewEmploye.name="";
        this.NewEmploye.address="";
        this.NewEmploye.marks=0;
       
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  EditClick(employe:Student){
    this.EditEmploye=employe
    
  }

  Update()
  {
    this.Empservice.updateemploye(this.EditEmploye).subscribe(
      (response)=>{
      
      },
      (error)=>{
        console.log(error);
      }
    )
  }

 

DeleteClick(id:Number)
{  

  Swal.fire({  
    title: 'Are you sure want to remove?',  
    text: 'You will not be able to recover this file!',  
    icon: 'warning',  
    showCancelButton: true,  
    confirmButtonText: 'Yes, delete it!',  
    cancelButtonText: 'No, keep it'  
  }).then((result) => {  
    if (result.value)
    {
      this.Empservice.Delete(id).subscribe(
        (response)=>{
         
          Swal.fire(  
            'Deleted!',  
            'Your imaginary file has been deleted.',  
            'success'  
          ) 
        })
        Swal.fire(  
          'Cancelled',  
          'Your Data are no deletd file is safe :)',  
          'error'  
        )  


    } else if (result.dismiss === Swal.DismissReason.cancel) {  
      Swal.fire(  
        'Cancelled',  
        'Your imaginary file is safe :)',  
        'error'  
      )  
    }  
  })  
}  
}

