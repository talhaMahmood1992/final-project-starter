/* eslint-disable no-extra-parens */
import React, { useContext } from "react";
import RatingFeature from "./MediaRating";
import "./RenderMedia.css"; // Import CSS file for styling
import { MediaInterface } from "../interfaces/MediaInterface";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CurrentUserContext } from "../store/currentUserContext";
import { deleteMedia } from "../api/mediaApi";
import { nanoid } from "nanoid";
function handleOnDrag(e: React.DragEvent, newMedia: string) {
    e.dataTransfer.setData("newMedia", newMedia);
}
export const mediaToElement = (
    mediaItem: MediaInterface,
    deleteMediaHandler: (mediaId: string) => void
): JSX.Element => {
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <div
            key={nanoid()}
            className="media-item"
            data-testid="mediaItem"
            draggable
            onDragStart={(e) => handleOnDrag(e, mediaItem.title)}
        >
            <img src={mediaItem.image} alt={mediaItem.title} />
            <div className="media-details">
                <p className="media-year" data-testid="mediaYear">
                    {mediaItem.yearReleased}
                </p>
                <div className="media-rating">
                    {<RatingFeature rating={mediaItem.rating}></RatingFeature>}
                </div>
                <p>
                    {mediaItem.genres[0]}
                    {mediaItem.genres.length > 1 ? ", " : " "}
                    {mediaItem.genres[1]}...
                </p>
            </div>
            {currentUser && currentUser.role === "Super" && (
                <button
                    className="remove-media-button"
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onClick={() => deleteMediaHandler(mediaItem._id!)}
                >
                    <RiDeleteBin2Fill />
                </button>
            )}
        </div>
    );
};

export default function RenderMedia({
    MediaData,
    setMediaList
}: {
    MediaData: MediaInterface[];
    setMediaList?: any;
}): JSX.Element {
    const deleteMediaHandler = async (mediaId: string) => {
        try {
            await deleteMedia(mediaId);
            const updatedMediaList = MediaData.filter(
                (media: MediaInterface) => media._id !== mediaId
            );
            setMediaList(updatedMediaList);
        } catch (error) {
            console.log(error);
        }
    };

    const mediaList = MediaData.map((Media) => {
        return {
            ...Media
        };
    });
    return (
        <div className="media-list-container" data-testid="mediaListContainer">
            <div className="media-list">
                {mediaList.map((mediaItem) =>
                    mediaToElement(mediaItem, deleteMediaHandler)
                )}
            </div>
        </div>
    );
}
