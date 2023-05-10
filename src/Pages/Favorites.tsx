/* eslint-disable no-extra-parens */
import React from "react";
// import RenderMedia from "../Components/RenderMedia";
import { DeleteMedia } from "../Components/RemoveMedia";
interface FavoriteMediaProps {
    userName: string;
}
export const FavoritesPage = (props: FavoriteMediaProps): JSX.Element => {
    return (
        <>
            <section className="page">
                <h2 className="heading-secondary">My Favorites</h2>
                <p>You will need to click on the page to see the changes</p>
            </section>
            <DeleteMedia userName={props.userName}></DeleteMedia>
        </>
    );
};
