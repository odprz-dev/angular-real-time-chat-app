import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { from, Subject } from 'rxjs';

import {ChatMessage} from '../../models/models'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  userActive = '';
  message ='';
  messageList: ChatMessage[] = [];
  constructor(public chatService: ChatService) { }

  @ViewChild('messageArea') messageArea: ElementRef;

  ngOnInit(): void {

  }


  public selectUser(e:any):void{
    this.userActive = e.target.value;
    if(this.isValidUser()){
      this.initialConnectionHub();
      this.chatService.subject$.subscribe();
    }
  }


  public initialConnectionHub():void{
    this.chatService.startConnection();
    this.chatService.obtenerMssgs();
    this.chatService.subject$.subscribe(result=>{
      this.messageList.push(result);
      document.getElementById('new-message').scrollIntoView();
    });
  }

  public enviar():void{
    if(this.message == null || this.message =='')
      return;
    this.chatService.enviarMensaje(this.userActive, this.message);
    this.message = '';
    // console.log(this.messageArea.nativeElement.scrollTop);
    // console.log(this.messageArea.nativeElement.scrollHeight);
    // console.log(this.message);
    // this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    // window.scrollTo(0,document.querySelector("messageArea").scrollHeight);
  }


  public isValidUser():boolean{
    if(this.userActive != null && this.userActive != ''){
      return true;
    }
    return false;
  }

  enterTextArea(e){
    e.preventDefault();
    this.enviar();
  }

}
