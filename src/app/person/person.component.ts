import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Person } from 'src/model/person';
import { PersonService } from '../service/person.service';

import { HttpClient, HttpEventType } from '@angular/common/http'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  selectedFile!: File ;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string='';
  imageName: any;


  persons: Person[]=[];
  cols:any;
  items:MenuItem[];
  displaySaveDialog: boolean=false;

  one: Person = {
    id: 0,
    name: '',
    lastName: '',
    adress: '',
    phone: ''
  };

  personSelected:Person;

  constructor(
    private personServ: PersonService,
    private messageServ: MessageService,
    private ConfirmServ: ConfirmationService,

    private httpClient: HttpClient
  ) { 

    this.personSelected={
      id: 0,
      name: '',
      lastName: '',
      adress: '',
      phone: ''
    }

    

    this.items = [
      {
        label: "New",
        icon: 'pi pi-fw pi-plus',
        command:()=>this.showSaveDialog(false)
      },
      {
        label: "Edit",
        icon: 'pi pi-fw pi-pencil',
        command:()=>this.showSaveDialog(true)
      },
      {
        label: "Delete",
        icon: 'pi pi-fw pi-times',
        command:()=>this.delete()
      },
    ] 
  }


  delete(){
    if(this.personSelected == null || this.personSelected.id == null){
      this.messageServ.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro"});
      return;
    }
    this.ConfirmServ.confirm({
      message: "¿Está seguro que desea eliminar el registro?",
      accept : () =>{
        this.personServ.delete(this.personSelected.id).subscribe(
          (result:any) =>{
            this.messageServ.add({ severity: 'success', summary: "Resultado", detail: "Se eliminó la persona con id "+result.id+" correctamente." });
            this.deleteObject(result.id);
          }
        )
      }
    })
  }


  deleteObject(id:number){
    let index = this.persons.findIndex((e) => e.id == id);
    if(index != -1){
      this.persons.splice(index, 1);
    }
  }
    getAll(){
        
    this.personServ.getAll().subscribe(
      (result:any)=>{
        console.log(result);

        let personTemp:Person[]=[];  

        for(let i = 0;i<result.length;i++){
          let unit = result[i] as Person;
          personTemp.push(unit);
        }  
        this.persons=personTemp;

      },error=>{
        console.log(error)
      }
    )
    

    }

  ngOnInit(): void {

    

    this.getAll();

      this.cols = [
          {field:"id", header:"ID"},
          {field:"name", header:"name"},
          {field:"lastName", header:"last name"},
          {field:"adress", header:"adress"},
          {field:"phone", header:"phone"},
      ];

      
 
    }

    showSaveDialog(edit: boolean): void {
      //throw new Error('Method not implemented.');
      if(edit){
        if(this.personSelected.id===0){
          this.messageServ.add({severity:'warn', summary:'Advertencia!', detail:" select one row!"});
        }else{
          this.one=this.personSelected;
          this.displaySaveDialog=true;
        }
        
      }else{
        this.one=new Person();
        this.displaySaveDialog=true;
      }
    }

    save(){
      this.personServ.save(this.one).subscribe(
        (result:any)=>{
           let newPerson = result as Person;
           this.persons.push(newPerson);
           this.messageServ.add({severity:'success', summary:"Resultado", detail:"new Person Saved"});
           this.displaySaveDialog=false;
        },
        error=>{
          console.log(error);
        }
      );
    }



 

  //Gets called when the user selects an image
  public onFileChanged(event:any) {

    console.log(event)
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
