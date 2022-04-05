const { getUnsplashImages } = require("../data/api");
const {
    getUserPostedImages,
    getBinnedImages,
    updateImage,
    isImagePostBinned,
    deletePostedImage,
    uploadImagePost,
} = require("../data/redis-db");

const data = [
    {
        id: "Y2ravKRtQZ0",
        url: "https://images.unsplash.com/photo-1648737153811-69a6d8c528bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MXwxfGFsbHwxfHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Windows",
        description: null,
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "sO-JmQj95ec",
        url: "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyfHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Kevin Lanceplaine",
        description: "Antelope Canyon",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "BkR842UVXqk",
        url: "https://images.unsplash.com/photo-1558816280-dee9521ff364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwzfHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Olena Sergienko",
        description: "pink petaled flower",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "GRLN5FC4cLg",
        url: "https://images.unsplash.com/photo-1552300977-cbc8b08d95e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHw0fHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Will Turner",
        description: "high angle photography of cliff",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "YDNvydD1jAY",
        url: "https://images.unsplash.com/photo-1490349368154-73de9c9bc37c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHw1fHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Maarten Deckers",
        description: "Flowers in spring",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "jjhvyxm34nY",
        url: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MXwxfGFsbHw2fHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Mia Baker",
        description: "Coworking space Industrious Atlanta",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "roZgc7SXXmI",
        url: "https://images.unsplash.com/photo-1472791108553-c9405341e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHw3fHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Nathan Anderson",
        description: "snow-capped mountain under sky",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "XFmznQhx9lM",
        url: "https://images.unsplash.com/photo-1563473213013-de2a0133c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHw4fHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Timothy Eberly",
        description: "Fall color in the countryside of Eastern Washington",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "4oovIxttThA",
        url: "https://images.unsplash.com/photo-1560850038-f95de6e715b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHw5fHx8fHx8MXx8MTY0OTEwNzM2NA&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Anton Shuvalov",
        description: "aerial view of houses near ocean",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "N6nnIx4C-Fo",
        url: "https://images.unsplash.com/photo-1516613835066-91cb1a42dda5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxMHx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Victoria Chen",
        description: "Secret Orange Garden",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "A5E-ym6WyGM",
        url: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MXwxfGFsbHwxMXx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Camylla Battani",
        description: "gray and black laptop computer on brown wooden table",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "8mqOw4DBBSg",
        url: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxMnx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Annie Spratt",
        description:
            "From a sunny afternoon spent wandering around the Glasshouse at RHS Wisley. I loved the texture and colours of these 🌿",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "h24WdfmRni4",
        url: "https://images.unsplash.com/photo-1574001412367-cf5f9756bb32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxM3x8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Martin Schmidli",
        description: "New Zealand Mountains #1",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "B1Zyw7sdm5w",
        url: "https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxNHx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Gábor Juhász",
        description: "tulip-bouquet-vienna",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "GJYY_5VZB3c",
        url: "https://images.unsplash.com/photo-1501254667263-b4867b4f7482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxNXx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Fernando Puente",
        description: "Mountain Under Mist",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "jv-vogT7hkU",
        url: "https://images.unsplash.com/photo-1648737119422-2680a7e39089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MXwxfGFsbHwxNnx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Windows",
        description: null,
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "gm3M-CsuynI",
        url: "https://images.unsplash.com/photo-1513546493312-0066d7de3fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxN3x8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Tim Zänkert",
        description:
            "If you like my work, i would appreciate a donation via PayPal. You can find the link in my profile!\n\nHave a nice day!",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "FzrlPh20l7Q",
        url: "https://images.unsplash.com/photo-1502429892517-ebe1510442a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxOHx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Jeremy Bishop",
        description:
            "Patterns found in Pismo Beach during sunset light up at the right angle when the sun and your naked eye align",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "eVQBXxeCre4",
        url: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwxOXx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Joanna Kosinska",
        description: "blueberry fruits",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "_xN7UbcZ33I",
        url: "https://images.unsplash.com/photo-1520236060906-9c5ed525b025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyMHx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Joanna Kosinska",
        description: "red cherry fruits",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "lFmuWU0tv4M",
        url: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MXwxfGFsbHwyMXx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Keila Hötzel",
        description: "White page with color chart for your ideas!",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "ot1luip6jbk",
        url: "https://images.unsplash.com/photo-1497051788611-2c64812349fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyMnx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Whitney Wright",
        description: "Oatmeal Chocolate Chip Cookie",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "hmSZSgCUIMk",
        url: "https://images.unsplash.com/photo-1547067592-463a85de7fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyM3x8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "João Marcelo Martins",
        description: "gray concrete stairs",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "-93ArahrTKc",
        url: "https://images.unsplash.com/photo-1543275485-77cf9dae2880?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyNHx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Ivan Bandura",
        description: "The cliffs",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "_5TGspSCIdw",
        url: "https://images.unsplash.com/photo-1476837579993-f1d3948f17c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyNXx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "sydney Rae",
        description: "Freshly Picked Apples",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "0VEDrQXxrQo",
        url: "https://images.unsplash.com/photo-1553272725-086100aecf5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MXwxfGFsbHwyNnx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Collins Lesulie",
        description: "man using laptop inside room",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "COUZB0613Ns",
        url: "https://images.unsplash.com/photo-1575495029254-f0b4c1581af3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyN3x8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Juli Kosolapova",
        description: "white petaled flowers",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "5P91SF0zNsI",
        url: "https://images.unsplash.com/photo-1507629221898-576a56b530bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyOHx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "eberhard 🖐 grossgasteiger",
        description: "Dark contrasts",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "FWaV69D5b8k",
        url: "https://images.unsplash.com/photo-1547049082-1a12c3bf2366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwyOXx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "Bruna Branco",
        description: "Lemon Curd Tarts",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
    {
        id: "3guU1kCxxy0",
        url: "https://images.unsplash.com/photo-1516481605912-d34c1411504c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTU4NDh8MHwxfGFsbHwzMHx8fHx8fDF8fDE2NDkxMDczNjQ&ixlib=rb-1.2.1&q=80&w=1080",
        posterName: "David Sola",
        description: "A crowd of Cactus",
        userPosted: false,
        binned: false,
        __typename: "ImagePost",
    },
];
const resolvers = {
    Query: {
        unsplashImages: async (_, { pageNum = 0 }) => {
            return data;
            const unsplashImages = await getUnsplashImages(pageNum);
            return unsplashImages;
        },
        binnedImages: async () => {
            const binnedImages = await getBinnedImages();
            return binnedImages;
        },
        userPostedImages: async () => {
            const postedImages = await getUserPostedImages();
            return postedImages;
        },
    },
    ImagePost: {
        binned: async (parentValue) => {
            return await isImagePostBinned(parentValue.id);
        },
    },
    Mutation: {
        updateImage: async (_, { input }) => {
            await updateImage(input);
            return input;
        },
        deleteImage: async (_, { id }) => {
            await deletePostedImage(id);
            return null;
        },
        uploadImage: async (_, { input }) => {
            return await uploadImagePost(input);
        },
    },
};

module.exports = { resolvers };
