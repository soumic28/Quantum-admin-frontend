import { Sports } from "../components/Others/Sports"
import { Facilities } from "../components/Others/Facilities"
import Location from "../components/Others/Location";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {CouponPage } from "../components/Others/Coupon";
import { CategoryPage } from "../components/Others/Category";


export default function Others() {
    
  return (
    <div className="my-8">
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="location" className="space-y-4">
            <TabsList>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="sports">
                Sports
              </TabsTrigger>
              <TabsTrigger value="facilities">
                Facilities
              </TabsTrigger>
              <TabsTrigger value="categories">
                Categories
              </TabsTrigger>
              <TabsTrigger value="coupon">
                Coupon
              </TabsTrigger>
            </TabsList>
            <TabsContent value="location" className="space-y-4">
                <Location/>
            </TabsContent>
            <TabsContent value="sports" className="space-y-4">
              <Sports/>
            </TabsContent>
            <TabsContent value="facilities" className="space-y-4">
                <Facilities/>
            </TabsContent>
            <TabsContent value="categories" className="space-y-4">
                <CategoryPage/>
            </TabsContent>
            <TabsContent value="coupon" className="space-y-4">
                <CouponPage/>
            </TabsContent>
          </Tabs>
      </div>
    </div>
  );
}
