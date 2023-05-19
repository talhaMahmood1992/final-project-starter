/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Slider } from "../Components/Slider/Slider";
import { Role } from "../Interfaces";
import RenderMedia from "../Components/RenderMedia";
import "./Header.css";
import { FaStar } from "react-icons/fa";
import { GiFlexibleLamp } from "react-icons/gi";
import { SearchBar } from "../Components/SearchAndFilter/SearchBar";
import { FilterButton } from "../Components/SearchAndFilter/FilterButton";
import { useFetchList } from "../hooks/useFetchList";
import { getMediaData } from "../api/mediaApi";
import { VscWatch } from "react-icons/vsc";
import { MediaInterface } from "../interfaces/MediaInterface";
import { UpdateUserMedia } from "../Components/UserMedia/UpdateUserMedia";
import { UpdateEditMedia } from "../Components/UserMedia/UpdateEditMedia";
import { LoadingSpinner } from "../UI/LoadingSpinner";

interface BrowseMediaProps {
    role: Role;
}

export const BrowseMedia = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    role
}: BrowseMediaProps): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [mediaList, loading, error, setMediaList] = useFetchList(
        getMediaData,
        "media",
        searchQuery
    );
    const [starColor, setStarColor] = useState<string>("black");
    const [toWatchMedia, setToWatchMedia] = useState<MediaInterface[]>([]);
    const [watchedMedia, setWatchedMedia] = useState<MediaInterface[]>([]);
    const [watchColor, setWatchColor] = useState<string>("black");

    function FindMedia(searchTerm: string) {
        const filteredData: MediaInterface[] = mediaList.filter(
            (media) => media["title"] === searchTerm
        );
        const media: MediaInterface = { ...filteredData[0] };
        return media;
    }

    function handleToWatchDrop(e: React.DragEvent) {
        const mediaRecieved = e.dataTransfer.getData("newMedia") as string;
        if (FindMedia(mediaRecieved)["title"] !== "") {
            setToWatchMedia([...toWatchMedia, FindMedia(mediaRecieved)]);
        }
        setStarColor("green");
        setWatchColor("black");
    }
    function handleWatchedDrop(e: React.DragEvent) {
        const mediaRecieved = e.dataTransfer.getData("newMedia") as string;
        if (FindMedia(mediaRecieved)["title"] !== "") {
            setWatchedMedia([...watchedMedia, FindMedia(mediaRecieved)]);
        }

        setStarColor("black");
        setWatchColor("green");
    }
    //To change the color of the star when the image can be dragged into the favoritesList
    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        setStarColor("black");
        setWatchColor("black");
    }
    function handleColor() {
        setStarColor("black");
        setWatchColor("black");
    }
    return (
        <section className="page">
            <div className="HeroSection_section_hero__bCGwu">
                <Slider />
            </div>
            <SearchBar setSearchQuery={setSearchQuery} />
            <FilterButton setSearchQuery={setSearchQuery} />
            {loading && (
                <LoadingSpinner message="fetching movies..." color="black" />
            )}
            {!loading && (
                <RenderMedia
                    MediaData={mediaList}
                    setMediaList={setMediaList}
                />
            )}
            {role !== "Super" && role !== "Admin" ? (
                <div className="header-container">
                    <h5>ToWatch</h5>
                    <h1
                        onDrop={handleToWatchDrop}
                        onDragOver={handleDragOver}
                        onDragEnd={handleColor}
                    >
                        <FaStar style={{ color: starColor }} />
                    </h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h5>Watched</h5>
                    <h1 onDrop={handleWatchedDrop} onDragOver={handleDragOver}>
                        <VscWatch style={{ color: watchColor }} />
                    </h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <UpdateUserMedia
                        toWatchMedia={toWatchMedia}
                        watchedMedia={watchedMedia}
                    ></UpdateUserMedia>
                    ;
                </div>
            ) : (
                <></>
            )}
            {role === "Super" || role === "Admin" ? (
                <div className="header-container">
                    <div onDrop={handleWatchedDrop} onDragOver={handleDragOver}>
                        <div className="header-container">
                            <GiFlexibleLamp
                                style={{ color: starColor, fontSize: "24px" }}
                            />
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <UpdateEditMedia
                        watchedMedia={watchedMedia}
                    ></UpdateEditMedia>
                </div>
            ) : (
                <></>
            )}
        </section>
    );
};
