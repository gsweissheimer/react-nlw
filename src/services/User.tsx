import api from './Api';

const userService = {
    getUser: (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/user/${params.id}`).then((response) => {
            params.callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
    },
};

export default userService;