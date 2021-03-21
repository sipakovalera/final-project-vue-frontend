import axios from 'axios';

export function getUsers(page, limit) {
    return axios.get('/', { params: { page, limit } });
};

export function sortUsers(page, limit, sortBy) {
    return axios.get('/', { params: {page, limit, sortBy } })
}

export function selectAvatar(page, limit, filter) {
    return axios.get('/', { params: { page, limit, filter } })
}

export function getFriends(id) {
    return axios.get(`/${id}/friends`)
}

export function getFriend(data) {
    return axios.put(`/friends`, data)
}

export function addFriend(id, data) {
    return axios.post(`/${id}/friend`, data)
}

export function deleteFriend(id) {
    return axios.delete(`/${id}/remove`)
}

export function currentUser(id) {
    return axios.get(`/${id}`);
};

export function deleteUser(id) {
    return axios.delete(`/${id}`);
};

export function updateUser(id, data) {
    return axios.put(`/${id}`, data );
};

export function updatePassword(id, data) {
    return axios.put(`/${id}/password`, data );
};

export function addAvatar(id, file) {
    return axios.post(`/avatar/${id}`, file)
}

