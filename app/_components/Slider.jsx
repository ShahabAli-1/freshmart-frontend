import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ sliderList }) => {
  return (
    <div className="relative overflow-hidden">
      {" "}
      {/* Added relative positioning */}
      <Carousel>
        <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem key={index}>
              <h2>{slider.name}</h2> {/* Corrected this line */}
              <Image
                src={slider.attributes?.image?.data[0]?.attributes?.url} // Ensure this path is correct
                unoptimized={true}
                height={400}
                width={900}
                className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
                alt="slider-image"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />{" "}
        {/* Positioned inside the container */}
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />{" "}
        {/* Positioned inside the container */}
      </Carousel>
    </div>
  );
};

export default Slider;
