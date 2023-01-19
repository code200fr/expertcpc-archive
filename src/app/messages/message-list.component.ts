import { Component } from "@angular/core";
import { Params } from "@angular/router";
import { ConfigurationService } from "../configuration.service";
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

    protected getPageSize(params: Params, configuration: ConfigurationService): number {
        let size: number = parseInt(params['size'], 10);
  
        const sizes: number[] = configuration.get('pageSizes');
  
        if (!sizes.includes(size)) {
            size = configuration.get('pageSize');
        }

        return size;
    }

    protected getPage(params: Params): number {
        let page = parseInt(params['page'], 10);

        if (!page || page < 1) {
            page = 1;
        }

        return page;
    }

    abstract getRouterPath(): string;
    abstract getRouterParams(): any;
}