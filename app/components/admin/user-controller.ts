import {UserService} from '../rest/user';

export class UserController {
    private errorMsg;
    private userList : Array<any>;
    static $inject: Array<string> = [
        '$location',
        'UserService',
    ];

    constructor(
        private $location: ng.ILocationService,
        private UserService: UserService) {
        this.getUsers();
    }
   
    public getUsers(){
        this.UserService.getUsers().then((users)=>{
            this.userList = users;
        });
    }
           
    public addUser(): void {
        this.$location.path('/admin/new');
    }

    public addLdapUser(): void {
        this.$location.path('/admin/newLdap');
    }

    public editUser(userId): void {
        this.$location.path('/admin/edit/'+userId);
    }

    public deleteUser(userId):void {
        this.UserService.deleteUser(userId).then((result) => {
            if(result.status === 200) {
                this.getUsers();
            }
        });
    }

    public configureLdap(): void {
        this.$location.path('/admin/ldap');
    }
}
