import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from './shared/services/storage.service';
import {environment} from 'src/environments/environment';

const { fetch: originalFetch } = window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private storageService: StorageService) {

    if (location.href.search("/redirect_uri") != -1)
      this.checkLoginSession();

  }

  ngOnInit(): void {

  }


  private checkLoginSession() {

    this.route.queryParams
      .subscribe(async params => {
        if (!params["code"]) return;
        var accessToken= await this.getAccessToken(params["code"]);
        if(accessToken == null) return;
        var rptAccessToken = await this.getRPTAccessToken(accessToken);
        if(rptAccessToken == null) return;
        this.storageService.setUserToken(rptAccessToken);
      })

  }
async getRPTAccessToken(accessToken:string):Promise<string | null>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", "Bearer "+accessToken);
  var urlencoded = new URLSearchParams(); 
  urlencoded.append("claim_token", "ewogICAgInJlcXVlc3RpbmdEZXBhcnRtZW50SWQiOlsiMiJdCn0=");
  urlencoded.append("claim_token_format", "urn:ietf:params:oauth:token-type:jwt");
  urlencoded.append("audience","ticketing-client");
  urlencoded.append("grant_type", "urn:ietf:params:oauth:grant-type:uma-ticket");

  window.history.replaceState({}, document.title, "/home" + "");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  return await fetch(environment.sso.ssoTokenIp, requestOptions)
    .then(response =>response.text())
    .then(result =>  JSON.parse(result).access_token)
    .catch(error => console.error('rpt', error));
}
async getAccessToken(code:string):Promise<string| null> {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "ticketing-client");
  urlencoded.append("client_secret", "xQvhP8NN0NbvvWFn6HajfK9enWJLMk2Q");
  urlencoded.append("code", code);
  urlencoded.append("redirect_uri", environment.sso.mySiteIp);
  urlencoded.append("grant_type", "authorization_code");

  window.history.replaceState({}, document.title, "/home" + "");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  return await fetch(environment.sso.ssoTokenIp, requestOptions)
    .then(response =>response.text())
    .then(result =>  JSON.parse(result).access_token)
    .catch(error => console.error('auth', error));
     
}


}



