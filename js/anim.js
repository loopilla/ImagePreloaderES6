document.addEventListener('DOMContentLoaded', (event) => {
    ImagePreloader.init(
        {
            items: [
                {
                    images: [
                            './images/Blue Toy Castle Tiles.png',
                            './images/Hand_Trap.png'
                        ]            
                },
                {
                    images: [
                            './images/Ulu City Background.png',
                            './images/Ulu City Tiles.png'
                        ]            
                }
            ]
        }
    );

    //Start the load process
    ImagePreloader.start()
    .then(() => {
        //When all images loaded
        console.log('Images load finished!');
    })
    .catch((err)=>{
        console.log(err);
    });
    
    console.log('Life goes on.');
});