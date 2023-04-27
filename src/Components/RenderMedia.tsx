/* eslint-disable no-extra-parens */
import React from "react";
//import { mediaData } from "../MediaData";
//import MediaFeature from "../Components/MediaRatting";
import { Media } from "../Interfaces";
import RatingFeature from "../Components/MediaRatting";
import "./RenderMedia.css"; // Import CSS file for styling
function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
}
export const mediaToElement = (mediaItem: Media): JSX.Element => {
    return (
        <div
            key={mediaItem.movieId}
            className="media-item"
            draggable
            onDragStart={(e) => handleOnDrag(e, mediaItem.movieId)}
        >
            <img src={mediaItem.image} alt={mediaItem.title} />
            <div className="media-details">
                {/* <h2 className="media-title">{mediaItem.title}</h2> */}
                <p className="media-year">{mediaItem.yearReleased}</p>
                <p className="media-rating">
                    {<RatingFeature rating={mediaItem.rating}></RatingFeature>}
                </p>
            </div>
        </div>
    );
};

export default function RenderMedia({
    MediaData
}: {
    MediaData: Media[];
}): JSX.Element {
    const mediaList = MediaData.map((Media) => {
        return {
            ...Media
        };
    });
    return (
        <div className="media-list-container">
            <div className="media-list">
                {mediaList.map((mediaItem) => mediaToElement(mediaItem))}
            </div>
        </div>
    );
}
