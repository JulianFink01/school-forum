import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../shared/models/Account';
import {AccountService} from '../../shared/services/account.service';
import {Language} from '../../shared/models/Language';
import {Observable} from 'rxjs';
import {LanguageService} from '../../shared/services/language.service';
import {Firestore} from '../../shared/utils/firestore';
import {Image} from '../../shared/models/Image';
import {ImageDTO} from '../../shared/models/DTO/ImageDTO';
import {AccountLogin} from "../../shared/store/actions/account.actions";
import {Store} from "@ngrx/store";
import {AccountState} from "../../shared/store/reducers/account.reducer";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  showModal = false;
  userData: FormGroup;
  languages$: Observable<Language[]>;
  selectedLanguage: Language | null;
  selectedProfilePicture: any = null;
  selectedThumbnail: any = null;
  errors: string[] = [];
  accountThumbnail: ImageDTO | null = null;
  accountProfilePicture: ImageDTO | null = null;

  @Input() accountData?: Account;

  constructor(private accountService: AccountService,
              private languageService: LanguageService,
              private storageService: Firestore,
              private store: Store<AccountState>) {
    this.userData = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        language: new FormControl(''),
        birthDay: new FormControl('', Validators.required),
        biography: new FormControl('', Validators.required)
      }
    );

    this.languages$ = this.languageService.getLanguages();
    this.selectedLanguage = null;
  }

  @ViewChild('profilePicture') profilePicture?: ElementRef;

  setProfilePicture(event: any): void {
    if (this.storageService.validateImage(event.target.files[0])) {
      this.errors = [];
      this.selectedProfilePicture = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedProfilePicture);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (this.profilePicture) {
            this.profilePicture.nativeElement.style.backgroundImage = 'url(' + reader.result + ')';
          }
        }
      };
    } else {
      this.errors = [];
      this.errors.push('Your Image Size is to big. Try to upload another Image witch is smaller than 5MB');
    }
  }

  @ViewChild('profileThumbnail') profileThumbnail?: ElementRef;

  setThumbnail(event: any): void {
    if (this.storageService.validateImage(event.target.files[0])) {
      this.errors = [];
      this.selectedThumbnail = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedThumbnail);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (this.profileThumbnail) {
            this.profileThumbnail.nativeElement.style.backgroundImage = 'url(' + reader.result + ')';
          }
        }
      };
    } else {
      this.errors = [];
      this.errors.push('Your Image Size is to big. Try to upload another Image witch is smaller than 5MB');
    }
  }


  getAccountData(): void {
    if (this.accountData) {
      this.userData.patchValue({firstName: this.accountData?.firstName ? (this.accountData?.firstName) : null});
      this.userData.patchValue({lastName: this.accountData?.lastName ? (this.accountData?.lastName) : null});
      this.userData.patchValue({biography: this.accountData?.biography ? (this.accountData?.biography) : null});
      if (this.accountData?.languages) {
        this.userData.patchValue({language: this.accountData?.languages ? (this.accountData?.languages[0]?.name) : null});
      }
      this.userData.patchValue({birthDay: this.accountData?.birthDay ? (this.accountData?.birthDay) : null});
      if (this.accountData.languages) {
        this.selectedLanguage = this.accountData.languages[0];
      }
    }
  }

  async getImage(image: any): Promise<any> {
    const url = await this.storageService.getBase64Image(image);
    if (url) {
      const imageDTO: Image = {
        path: url.currentTarget.result,
        description: '',
        id: null
      };
      return imageDTO;
    }
  }

  async saveImages(): Promise<any> {
    if (this.selectedProfilePicture && this.accountData) {

      this.accountProfilePicture = await this.getImage(this.selectedProfilePicture);

      // @ts-ignore
      this.accountData.profilePicture = null;

    }
    if (this.selectedThumbnail && this.accountData) {
      this.accountThumbnail = await this.getImage(this.selectedThumbnail);

      // @ts-ignore
      this.accountData.thumbnail = null;
    }
    this.editAccount();

  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  setLanguage(lang: Language): void {
    this.selectedLanguage = lang;
  }

  ngOnInit(): void {
    this.getAccountData();
  }

  saveAccount(): void {
    this.saveImages();
  }

  editAccount(): void {
    if (this.accountData) {
      this.accountData.firstName = this.userData.value.firstName;
      this.accountData.lastName = this.userData.value.lastName;
      this.accountData.biography = this.userData.value.biography;
      if (this.selectedLanguage) {
        this.accountData.languages = [this.selectedLanguage];
      }
      this.accountData.birthDay = this.userData.value.birthDay;

      this.accountService.updateAccount(this.accountData).subscribe((accountData) => {
        if (this.accountProfilePicture != null) {
          accountData.profilePicture = this.accountProfilePicture;
        }
        if (this.accountThumbnail != null) {
          accountData.thumbnail = this.accountThumbnail;
        }
        const accountUpdate = new AccountLogin({account: accountData});
        this.store.dispatch(accountUpdate);
        if (this.accountProfilePicture) {
          this.accountService.setProfilePicture(accountData.id, this.accountProfilePicture).subscribe();
        }
        if (this.accountThumbnail) {
          this.accountService.setThumbnail(accountData.id, this.accountThumbnail).subscribe();
        }
        localStorage.setItem('accountInformation', JSON.stringify(accountData));
      });
      this.toggleModal();
    }
  }


}
