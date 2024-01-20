
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Roles } from '../decorator/roles.decorator';
import { decode } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean {

        /**
         * Get roles from your controller you defined.      
         * Example: @Roles([AppRoles.ADMINS]), so we will get ['Admin']
         */
        const roles = this.reflector.get(Roles, context.getHandler());

        if (!roles) {
            return true;
        }

        /**
         * Here we compare about the user request suit with the role we defined or not
         */
        const request = context.switchToHttp().getRequest();

        // let user = 
        return true;
    }
}