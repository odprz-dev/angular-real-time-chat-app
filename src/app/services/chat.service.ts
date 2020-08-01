import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { from } from 'rxjs';
import { ChatMessage } from '../models/models';


// const HUB_URL = 'https://localhost:44339/';
const HUB_URL = 'https://chat.odprz.dev/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  subject$ = new Subject<ChatMessage>();
  chatMessagesList: ChatMessage[] = [];

  constructor() { }

  private hubConnection: signalR.HubConnection;
  chatMessage: ChatMessage;

  public startConnection = ()=> {
    this.hubConnection = new signalR.HubConnectionBuilder()
                          .withAutomaticReconnect()

                          .withUrl(HUB_URL+'chat')
                          .build();

    this.hubConnection.keepAliveIntervalInMilliseconds = 5000;

    this.hubConnection.start()
          .then(()=> console.log('Conneccion establecida'))
          .catch((err)=>console.log('Ocurrio un error al establecer la conección. msg: ',err)
          );
  }

  public enviarMensaje =(usuario: string, mensaje: string)=>{
    const message : ChatMessage = {
      usuario: usuario,
      mensaje: mensaje,
      timeStamp: new Date(),
    }
    this.hubConnection.invoke('SendMessage', message).catch(err=>console.log('error al mandar el mensaje: ',err));
  }

  public obtenerMssgs = ()=>{
    this.hubConnection.on('ReciveMessage',(chatMessage: ChatMessage)=>{
      this.chatMessagesList.push(chatMessage);
      this.subject$.next(chatMessage);
    });
  }

}


