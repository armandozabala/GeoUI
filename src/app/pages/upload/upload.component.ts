import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  title = 'fileUpload';
  archivos;
  descarga:any;
  finalizado = false;
  progreso = 0;
  multipleImages = [];


  constructor(private http: HttpClient, private auth: AuthService, private router: Router){}

  ngOnInit(){

    this.auth.isAuth().subscribe((data:any) => {
          if(data){
            console.log("yes - ");
          }else{
            this.router.navigateByUrl('/login')
          }
    });

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.archivos = file;
    }
  }

  onDownload(archivo:any){

       
      this.http.get(environment.url+"download/"+archivo, {responseType: "blob" }) //set response Type properly (it is not part of headers)
               .toPromise()
                .then(blob => {
                    saveAs(blob, archivo); 
                })
               .catch(err => console.error("download error = ", err));

  }


  onSubmit(){

 
    if(this.archivos == undefined){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe cargar primero un archivo!',
      });
    }
    else{
    let formData = new FormData();
    formData.append('archivo', this.archivos);

    const req = new HttpRequest('POST',environment.url+'upload/subidos/geo_file', formData, { 
          reportProgress: true
    });

    this.http.request(req).subscribe( event => {

      if(event.type === HttpEventType.UploadProgress){
            
              this.progreso = Math.round((event.loaded/event.total) * 100);


      }else if(event.type === HttpEventType.Response){
           let response: any = event.body;
           this.finalizado = response.ok;
           swal.fire({
            icon: 'success',
            title: 'Procesado Correctamente!',
            text: 'Archivo '+this.archivos.name+' cargado! ',
          });
           this.descarga = response.path;
      }

    });
     }
  }

}
