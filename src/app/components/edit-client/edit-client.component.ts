import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
	//add Properties
	id:string;
	client:Client = {
		firstName: '',
		lasttName: '',
		email: '',
		phone: '',
		balance: 0,
	}
	disableBalanceOnEdit:boolean = true;




  constructor(
  	//Declare all dependencies to be used
  		public clientService:ClientService,
  		public router:Router,
  		public route:ActivatedRoute,
  		public flashMessagesServices:FlashMessagesService,
      public settingsService:SettingsService
  	) { }

  ngOnInit() {

  //Get ID
  	this.id = this.route.snapshot.params['id'];
    //Takes de property of the settings.service file
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  	//Get Client
  	this.clientService.getClient(this.id).subscribe(client => {
  		
  		this.client = client;
  		console.log(this.client);
  	});



  }


  //Gestionar el submit del edit
  onSubmit({value,valid}:{value:Client, valid:boolean}){

    //If para verificar si el formulario es válido
    if(!valid){
      this.flashMessagesServices.show('Plase fill in all fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['edit-client/'+this.id]);
    } else {
      //Update the client
      this.clientService.updateClient(this.id,value);
      //Success Message after adding a client
      this.flashMessagesServices.show(' Client Updated!', {cssClass:'alert-success', timeout:3000});
      this.router.navigate(['/client/' +this.id]);
    }
  }

}
