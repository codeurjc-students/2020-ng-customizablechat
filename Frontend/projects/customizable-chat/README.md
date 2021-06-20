# Ng-Customizable-Chat

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

It is build in the base of [Angular Material](https://material.angular.io/) version 11.0.3

## Introduction

This library's purpose is the visual implementation of a chat. This library is composed of two components at least for the moment.
Both components help in the making of a chat, but they have different purposes. On the one hand ChatList helps to manage a list of chats unopened.
On the other hand ChatBox helps to manage the principal interaction with an opened chat, including: file upload, text messages, an emoji menu, an information
menu of the chat that is displayed.

## Chat List

As mentioned before, this component's purpose is to display a list of chats, with information about two different types of chats, private and group chats,
In both of them the information that could be displayed is an image that describes the chat, the name of the chat and if it is a private chat, the name 
of the person involved; the last message sent to the chat and finally the quantity of messages unseen.

The inputs of this component are the following:

- [user] : This represents the user of application. The main fields are `idSettings` that references 1 for Day Theme and 2 for Night Theme,
  `userName` that represents the name of the user (it is also used to detect in private chats who the user is talking to).
  
- [chatChange] : This represents the info of the displayed chat. This variable is only to treat the display of the main chat and return to the component in 
which you are using this component of the library. It is a Subject you can subscribe to gather information of the chat 
  the user wants to display, as you display the chat the moment the user clicks in it
  
- [privateChats] || [groupChats] : This represents an array of chats one for each type, the info that both have to have in common is:
the `image` field, a chat `name`, chat `participants` in which in the case of group chats is an array of strings with the names of the users and 
  in the case of the private chats is a string with the other participant, and the name corresponds to the creator of the chat also the name.


> Note: The marked words corresponds to the name of the inner variable of the input. 

## ChatBox

As mentioned before, this component's purpose is to display a chat, with information about the chat, the description of the chat, the image, 
a dropzone for file messages, a form of image display, an emoji menu, a list of messages with info of the sender.

The inputs of this component are the following:

- [user] : This represents the user of application. The main fields are `idSettings` that references 1 for Day Theme and 2 for Night Theme,
  `userName` that represents the name of the user (it is also used to detect in private chats who the user is talking to).

- [chatObs] : This represents the info of the displayed chat.  The main fields of the chat are the following: the `image` of the chat in the case of group chats, 
in the case of private chats you should include an image of the user whose chat is opened, the `name` and `participants` with the same function as in Chat list 
  component, `isPrivate` field is used to detect if the chat is of private or group type. 

- [listChats] : This represents an array of strings corresponding with the urls or socket messages that the component is going to use to send messages and 
  interact with teh api, listChats[0] --> where to send files via http request, listChats[1] --> socket message for a private message, listChats[2] --> socket 
  message for a group message, listChats[3] --> socket message to indicate to the users that a file is saved in database and was sent to the chat, is indicates 
  the users that they have to do an http request to obtain the file, this is cause sockets have size limits in messaging.
  
- [messageList] : This contains the list of messages of the chat displayed, the format of the messages is the following:
> Note : `class Message {
message: String;
date: Date;
sender: String;
chatId: String;
type:String;
buffer:Buffer;}`

- [socket] : This is user's socket that will be used for communication with the websocket's service of the api 
  (currently using ngx-socket-io for the implementation of the sockets)

> Note: The marked words corresponds to the name of the inner variable of the input.

> Note: For text messages use type : 'message', for the rest of the formats include the explicit format, f.e. 'image/png'


The chat box depends on ngx-socket-io for the socket implementation, the emojis depend on the PickerModule of @ctrl/ngx-emoji-mart, the file dropzone depends
on the NgxDropzoneModule of ngx-dropzone
