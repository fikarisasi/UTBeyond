import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {
  // url = 'https://api.au.apiconnect.ibmcloud.com/fikar-opus/sb/api';
  url = 'http://batucityliving-api.au-syd.mybluemix.net/api';
  new_url = 'https://api.us.apiconnect.ibmcloud.com/bluemixadminorg-smartcity/sb/api/Contents/';
  uturl = "http://localhost:3000/api"

  contentHeader: Headers = new Headers({
    'x-ibm-client-id': '8b0ccfb8-4dd0-4772-8923-00b1765c7325',
    'x-ibm-client-secret': 'H4lQ1xA1mW6cO0jS4kC5oM5jV2gA0nT6nE2wP4oB5tO6qQ6oS1'
  });
  newContentHeader: Headers = new Headers({
    'x-ibm-client-id': 'd2dcbc49-3dba-4151-b2b0-4d22cba60ac9',
    'x-ibm-client-secret': 'nL5lY8vS3gO5rD6fQ4kC7gQ5bY2lB3rY4lY4lV0qV2wH5aN4iA'
  });

  constructor(public http: Http) {
    this.http = http;
    console.log('Hello ContentService Provider');
  }

  uploadImage(dataImage, path){
    let dropboxUploadHeader = new Headers();
    dropboxUploadHeader.append('Content-Type', 'application/octet-stream');
    dropboxUploadHeader.append('Authorization', 'Bearer F14yMTCl1FAAAAAAAAAAoabTsnus7u1aQAX0hZtAQ-0gR1GM6BR8gFUhYlSyY8nk');
    dropboxUploadHeader.append('Dropbox-API-Arg', '{"path":"' + path + '","mode":{".tag":"overwrite"}}')
    // this.dropboxUploadHeader(headers, path);
    console.log(dropboxUploadHeader);
    return Observable.create(observer => {
      return this.http.post('https://content.dropboxapi.com/2/files/upload', dataImage, {
        headers: dropboxUploadHeader
      })
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        // observer.next(this.data);
        observer.next(data);
        observer.complete();
      })
    })
  }

  getImageLink(dataImage){
    let dropboxGetLinkHeader = new Headers();
    dropboxGetLinkHeader.append('Content-Type', 'application/json');
    dropboxGetLinkHeader.append('Authorization', 'Bearer F14yMTCl1FAAAAAAAAAAoabTsnus7u1aQAX0hZtAQ-0gR1GM6BR8gFUhYlSyY8nk');
    return Observable.create(observer => {
      return this.http.post('https://api.dropboxapi.com/2/sharing/create_shared_link', dataImage, {
        headers: dropboxGetLinkHeader
      })
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        // observer.next(this.data);
        observer.next(data);
        observer.complete();
      })
    })
  }

  getContents(){
    return Observable.create(observer => {
      return this.http.get(this.new_url + '?filter={"order": "created_at desc"}', {headers: this.newContentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  postContent(content){
    return Observable.create(observer => {
      return this.http.post(this.new_url, content, {headers: this.newContentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  putContent(content){
    return Observable.create(observer => {
      return this.http.put(this.new_url, content, {headers: this.newContentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  deleteContent(contentId){
    return Observable.create(observer => {
      return this.http.put(this.new_url + contentId, {headers: this.newContentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  getNews(){
    return Observable.create(observer => {
      return this.http.get(this.url + '/News?filter={"order": "posted_date desc"}', {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  postNews(news){
    return Observable.create(observer => {
      return this.http.post(this.url + '/News', news, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  putNews(news){
    return Observable.create(observer => {
      return this.http.put(this.url + '/News/' + news.id, news, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  deleteNews(newsId){
    return Observable.create(observer => {
      return this.http.delete(this.url + '/News/' + newsId, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  getPlaces(){
    return Observable.create(observer => {
      return this.http.get(this.url + '/Places?filter={"order": "place_name asc"}', {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  postPlace(place){
    return Observable.create(observer => {
      return this.http.post(this.url + '/Places', place, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  putPlace(place){
    return Observable.create(observer => {
      return this.http.put(this.url + '/Places/' + place.id, place, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  deletePlace(placeId){
    return Observable.create(observer => {
      return this.http.delete(this.url + '/Places/' + placeId, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  getPublicTransport(){
    return Observable.create(observer => {
      return this.http.get(this.url + '/public_transports?filter={"order": "transport_name asc"}', {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  postPublicTransport(publicTransport){
    return Observable.create(observer => {
      return this.http.post(this.url + '/public_transports', publicTransport, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  putPublicTransport(publicTransport){
    return Observable.create(observer => {
      return this.http.put(this.url + '/public_transports/' + publicTransport.id, publicTransport, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  deletePublicTransport(publicTransportId){
    return Observable.create(observer => {
      return this.http.delete(this.url + '/public_transports/' + publicTransportId, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  getEmergencyContacts(){
    return Observable.create(observer => {
      return this.http.get(this.url + '/emergency_contacts?filter={"order": "emergency_name asc"}', {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  postEmergencyContacts(emergencyContact){
    return Observable.create(observer => {
      return this.http.post(this.url + '/emergency_contacts', emergencyContact, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  putEmergencyContacts(emergencyContact){
    return Observable.create(observer => {
      return this.http.put(this.url + '/emergency_contacts/' + emergencyContact.id, emergencyContact, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  deleteEmergencyContacts(emergencyContactId){
    return Observable.create(observer => {
      return this.http.delete(this.url + '/emergency_contacts/' + emergencyContactId, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  getEvents(){
    return Observable.create(observer => {
      return this.http.get(this.url + '/Events?filter={"order": "event_title asc"}', {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  postEvent(event){
    return Observable.create(observer => {
      return this.http.post(this.url + '/Events', event, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  putEvent(event){
    return Observable.create(observer => {
      return this.http.put(this.url + '/Events/' + event.id, event, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  deleteEvent(eventId){
    return Observable.create(observer => {
      return this.http.delete(this.url + '/Events/' + eventId, {headers: this.contentHeader})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  login(username, password){
    return Observable.create(observer => {
      return this.http.post(this.url + 'wp-json/jwt-auth/v1/token', {username: username, password: password})
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  loginold(username, password){
    return Observable.create(observer => {
      return this.http.get(this.url + 'api/user/generate_auth_cookie/?username='+ username +'&password='+ password)
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }


  getRecentBookByPagination(page, token) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token)

    return Observable.create(observer => {
      return this.http.get(this.url + 'api/get_recent_posts/?post_type=sdm_downloads&page=' + page, {
        headers: headers
      })
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  search(query, page, token) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token)

    return Observable.create(observer => {
      return this.http.get(this.url + 'api/get_search_results/?search="' + query + '"&post_type=sdm_downloads&page=' + page, {
        headers: headers
      })
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(data => {
        // this.data = data;
        observer.next(data);
        observer.complete();
      })
    })
  }

  postShowQuestion(questionIndex){
    return Observable.create(observer => {
      return this.http.post(this.uturl + '/showQuestions/replaceOrCreate', questionIndex)
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(success => {
        // this.data = data;
        observer.next({success: true, data: success});
        observer.complete();
      },
      error => {
        observer.next({success: false, data: error});
        observer.complete();
      })
    })
  }

  getShowQuestion(){
    return Observable.create(observer => {
      return this.http.get(this.uturl + '/showQuestions')
      .map(res => res.json())
      // .catch(this.handleError)
      .subscribe(success => {
        // this.data = data;
        observer.next({success: true, data: success});
        observer.complete();
      },
      error => {
        observer.next({success: false, data: error});
        observer.complete();
      })
    })
  }

}
