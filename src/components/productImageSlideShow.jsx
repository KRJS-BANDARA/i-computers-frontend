import { useState } from "react";

export default function productImageSlideShow(props) {
    const images = props.images;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

   
    return (
        <div className="w-[400px] h-[500px]">
            <img src={images[currentImageIndex]} className="w-full h-full object-cover rounded-lg shadow-lg"/>
            
            <div className="w-full h-100 flex justify-center items-center gap-4 mt-4">
                {
                    images.map((image, index) => {
                        return (
                            <img key={index} src={image} className={"w-[80px] h-[80px] object-cover rounded-lg shadow-lg cursor-pointer " + (index === currentImageIndex ? "border-4 border-accent" : "")} 
                            onClick={() => setCurrentImageIndex(index)} />
                        );
                    })
                }
            </div>
            
        </div>
    );
}