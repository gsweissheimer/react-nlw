import api from './Api';

const userService = {
    getUser: (params: { id: string, callback: (data: any) => void }) => {
        api.get(`/user/${params.id}`).then((response) => {
            if (!response.data.hasError) {
                params.callback(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    },
};

export default userService;