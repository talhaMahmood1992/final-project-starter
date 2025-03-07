import { EditMediaSubmitForm } from "../Interfaces";
import { ENDPOINTS } from "../constants/endpoints";
import { MediaInterface } from "../interfaces/MediaInterface";
import { api } from "../utils/api";

const { MEDIA } = ENDPOINTS;

export const getMediaData = async (searchQuery: string) => {
    return api.get(`${MEDIA}${searchQuery}`);
};

export const addMedia = async (media: MediaInterface) => {
    return api.post(MEDIA, media);
};

export const updateMedia = async (
    mediaId: string,
    updatedFields: EditMediaSubmitForm
) => {
    const endpoint = `${MEDIA}/${mediaId}`;
    return api.patch(endpoint, updatedFields);
};

export const deleteMedia = async (mediaId: string) => {
    const endpoint = `${MEDIA}/${mediaId}`;
    return api.delete(endpoint);
};
