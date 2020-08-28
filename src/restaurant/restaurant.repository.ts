import { EntityRepository, MongoRepository } from 'typeorm';
import { Restaurant } from './entities/Restaurant.entity';
import { ObjectID } from 'mongodb';

@EntityRepository(Restaurant)
export class RestaurantRepository extends MongoRepository<Restaurant> {

    
    async createRestaurant(restaurantregisterDto: any,id):Promise<any>{

        const {name,address,contact,photos,location}=restaurantregisterDto;
        const restaurant = new Restaurant();
        restaurant.name = name;
        restaurant.address = address;                           
        restaurant.contact = contact;               
        restaurant.ownerID = id;        
        restaurant.photos = photos;   
        restaurant.status= 'ACTIVE';
        restaurant.location = location;
        await this.save(restaurant);   
        console.log(restaurant);
        
        return restaurant;
    }

}