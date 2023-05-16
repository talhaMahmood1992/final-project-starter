/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import { Slider } from "../Components/Slider/Slider";
import { mediaData } from "../MediaData";
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
import { ToWatch } from "../Components/UserMedia/ToWatch";
import { MediaInterface } from "../interfaces/MediaInterface";
import { Watched } from "../Components/UserMedia/Watched";

interface FavoriteMediaProps {
    //UserName of the CurrentUser
    userName: string;
    superTitles: string[];
    handleEdits: (titles: string[]) => void;
    //Role of the current User
    role: Role;
}

export const BrowseMedia = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userName,
    superTitles,
    handleEdits,
    role
}: FavoriteMediaProps): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [mediaList, loading] = useFetchList(
        getMediaData,
        "media",
        searchQuery
    );
    // const [mediaList, setMediaList] = useState<Media[]>([]);
    // function handleRender(mediaList: Media[]) {
    //     setMediaList([...mediaList]);
    // }
    const [edits, setEdits] = useState<string[]>(superTitles);
    const [starColor, setStarColor] = useState<string>("black");
    const [toWatchMedia, setToWatchMedia] = useState<MediaInterface>();
    const [watchedMedia, setWatchedMedia] = useState<MediaInterface>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [watchColor, setWatchColor] = useState<string>("Green");

    function FindMedia(searchTerm: string) {
        const filteredData = mediaList.filter(
            (media) => media["title"] === searchTerm
        );
        return filteredData[0];
    }

    function handleToWatchDrop(e: React.DragEvent) {
        const mediaRecieved = e.dataTransfer.getData("newMedia") as string;
        //Update the state and then update the userData
        setToWatchMedia(FindMedia(mediaRecieved));
        // updateWatchedMediaForUser(userName, [FindMedia(newFavorite)]);
        setStarColor("black");
    }
    function handleWatchedDrop(e: React.DragEvent) {
        const mediaRecieved = e.dataTransfer.getData("newMedia") as string;
        //Update the state and then update the userData
        setWatchedMedia(FindMedia(mediaRecieved));
        // updateWatchedMediaForUser(userName, [FindMedia(newFavorite)]);
        setStarColor("black");
    }

    function handleOnEditsDrop(e: React.DragEvent) {
        const newEdit = e.dataTransfer.getData("newMedia") as string;
        if (!superTitles.includes(newEdit)) {
            setEdits([...edits, newEdit]);
            handleEdits([...edits, newEdit]);
            console.log([...edits, newEdit]);
            setStarColor("black");
        }
    }
    //To change the color of the star when the image can be dragged into the favoritesList
    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        setStarColor("green");
    }

    return (
        <section className="page">
            <div className="HeroSection_section_hero__bCGwu">
                <Slider />
            </div>
            <SearchBar setSearchQuery={setSearchQuery} />
            <FilterButton setSearchQuery={setSearchQuery} />
            {!loading && <RenderMedia MediaData={mediaList} />}
            {role !== "Super" && role !== "Admin" ? (
                <div className="header-container">
                    <h5>ToWatch</h5>
                    <h1 onDrop={handleToWatchDrop} onDragOver={handleDragOver}>
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
                        <VscWatch style={{ color: starColor }} />
                    </h1>
                </div>
            ) : (
                <></>
            )}

            {role === "Super" || role === "Admin" ? (
                <div onDrop={handleOnEditsDrop} onDragOver={handleDragOver}>
                    <div className="header-container">
                        <GiFlexibleLamp
                            style={{ color: starColor, fontSize: "24px" }}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}
            <h3>For ToWatch</h3>
            {toWatchMedia && <ToWatch media={toWatchMedia!}></ToWatch>}
            <h3>For Watched</h3>
            {watchedMedia && <Watched media={watchedMedia!}></Watched>}
        </section>
    );
};
export function FindMedia(searchTerm: string) {
    const filteredData = mediaData.filter(
        (media) => media.title.toLowerCase() === searchTerm.toLowerCase()
    );
    return filteredData[0];
}
