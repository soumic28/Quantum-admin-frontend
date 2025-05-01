import { Searchbox } from "../../ui/Searchbox";
import HomeCarousel from "./HomeCarousel";
import { Button } from "../../ui";
import { useState } from "react";

function Main() {
  const [isCarouselOpen, setIsCarouselOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <div>
        <div>
          <Searchbox />
        </div>
      </div>
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {/* <Card title={"card list"} data={"12154"} />
        <Card title={"card list"} data={"12154"} />
        <Card title={"card list"} data={"12154"} /> */}
      </div>
      <Button
        variant={isCarouselOpen ? "destructive" : "default"}
        onClick={() => setIsCarouselOpen(!isCarouselOpen)}
        className="fixed top-4 right-4"
      >
        {isCarouselOpen ? "Close Carousel" : "Open Carousel"}
      </Button>
      {isCarouselOpen && <HomeCarousel />}
    </div>
  );
}

export default Main;
