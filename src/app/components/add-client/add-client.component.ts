import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router }  from '@angular/router';
import { ClientService} from '../../services/client.service';
import { Client } from '../../models/Client';
import { SettingsService} from '../../services/settings.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

//make a new client equals to the Client imported and set all fields blank
client:Client = {
	firstName: '',
	lasttName: '',
	email: '',
	phone: '',
	balance: 0,
}

disableBalanceOnAdd: boolean = true;

  constructor(
      public flashMessagesServices: FlashMessagesService,
      public router:Router,
      public clientService:ClientService,
      public settingsService:SettingsService
    ) { }

  ngOnInit() {

    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  //funcion onSubmit para mandar los datos a firebase
  onSubmit({value,valid}:{value:Client, valid:boolean}){

    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    //If para verificar si el formulario es válido
  	if(!valid){
      this.flashMessagesServices.show('Plase fill in all fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['add-client']);
    } else {
      //Add a new client
      this.clientService.newClient(value);
      //Success Message after adding a client
      this.flashMessagesServices.show('New Client Added!', {cssClass:'alert-success', timeout:3000});
      this.router.navigate(['/']);
    }
  }

}
