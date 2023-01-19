import { Component } from "@angular/core";
import { MessageResponse } from "./messages";

export abstract class MessageListComponent {
    response: MessageResponse;

    protected renderResponse(response: MessageResponse, component: MessageListComponent) {
        component.response = response; // trick to make component inheritance work
        
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'auto'
        });
    }

    abstract getRouterPath(): string;
    abstract getRouterParams(): any;
}