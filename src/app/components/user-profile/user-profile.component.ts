import {Component, OnInit} from '@angular/core';
import {UserProfielService} from './user-profile.service';
import {StorageService} from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any

  constructor(private _userProfile: UserProfielService, private _storageService: StorageService) {


  }

  ngOnInit(): void {


    this._userProfile.getUserProfile().subscribe();
    this._userProfile.userProfile$
      .subscribe((userProfile: any) => {
        this.userProfile = userProfile

      });

  }

}
