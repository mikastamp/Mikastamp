const images = [
    'https://mikastamp.com/wp-content/uploads/2023/12/to-the-moon-and-back.jpg',
    'https://mikastamp.com/wp-content/uploads/2023/12/SQUARE-TRANSPARANT_.jpg',
    'https://mikastamp.com/wp-content/uploads/2023/12/leaving-the-port.jpg',
    'https://mikastamp.com/wp-content/uploads/2023/12/Just-launch-it.jpg',
    'https://mikastamp.com/wp-content/uploads/2023/12/e5c405a99cd1e935aa8b7303262f9854e770189f6519779327386c4637af1737.jpg',
    'https://mikastamp.com/wp-content/uploads/2023/12/atomic-1.jpg',
    'https://mikastamp.com/wp-content/uploads/2023/12/a-new-dawn.jpg',
    'https://mikastamp.com/wp-content/uploads/2023/12/159S.jpg',

    // Add more image filenames as needed
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

export default getRandomImage;
