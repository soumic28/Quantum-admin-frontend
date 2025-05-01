import { atom ,selector } from 'recoil';
import { getLocations } from '../api/location';

export const locationsState = atom({
  key: 'locationsState',
  default: [], 
});


export const locationsSelector = selector({
    key: 'locationsSelector',
    get: async ({ get }) => {
      try {
        const response = await getLocations();
        return response.data;
      } catch (error) {
        console.log('Failed to fetch locations', error); 
        return get(locationsState);
      }
    },
    set: async ({set,get})=>{
        try {
            const response = await getLocations();
            set(locationsState,response.data);
            return response.data;
          } catch (error) {
            console.log('Failed to fetch locations', error); 
            return get(locationsState);
          }
    }
  });