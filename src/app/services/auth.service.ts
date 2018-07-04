import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Observable} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
  	public afAuth:AngularFireAuth
  	) { }


//login user function
login(email:string, password:string){
	return new Promise((resolve, reject) => {
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
		//El .then es parte de la promesa en caso positivo, luego lo cachamos en login de OnSubmit en el .then o .catch
		.then(userData => resolve(userData),
			//If there is an error get the error lo cachamos en .catch
			err => reject(err));
	});
}

//Check User Status
getAuth(){
	return this.afAuth.authState.map(auth => auth);
}
//logout function
logout(){
	this.afAuth.auth.signOut();
}

//Register User
register(email:string, password:string){
	return new Promise((resolve, reject) => {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then(userData => resolve(userData),
				err => reject(err));
	})
}


}
