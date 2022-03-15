import React from "react";
function Home() {
    return (
        <>
            <div className="main-wrapper">
                <div>
                    <img
                        src="https://terrigen-cdn-dev.marvel.com/content/prod/1x/characters_art_mas_dsk_01.jpg"
                        alt="Marvel Characters"
                        className="main-image"
                    />
                </div>
                <div className="main-text">
                    <span className="main-title">MARVEL</span>
                    <p className="side-text">
                        Welcome to marvel API project here you can search and
                        get information about any Marvel characters, comics, and
                        series available in the marvel universe. Web site uses
                        official marvel API to get all the information, so the
                        information provided is 100% credible.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Home;
