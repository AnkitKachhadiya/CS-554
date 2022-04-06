const axios = require("axios");

const BASE_URL = "https://api.unsplash.com/";
const ACCESS_KEY = "_kEH7ozdVUUbKA3H7KRdgxVDdxyn2EVRXwGEC4RaGZU";

async function getUnsplashImages(pageNum = 0) {
    try {
        const PER_PAGE = 30;

        const API_URL = `${BASE_URL}/photos?per_page=${PER_PAGE}&page=${pageNum}&client_id=${ACCESS_KEY}`;

        const { data } = await axios.get(API_URL);

        return Array.isArray(data) ? data.map((image) => getImage(image)) : [];
    } catch (error) {
        console.log(error);
    }
}

function getImage(image) {
    return {
        id: image.id,
        url: image.urls.regular,
        posterName: image.user.name,
        description: image.description || image.alt_description,
        userPosted: false,
        binned: false,
    };
}

module.exports = {
    getUnsplashImages,
};
