import { ProfileStore } from './ProfileStore';
import { OrderStore } from './OrderStore';
import { ProductStore } from './ProductStore';
import { AuthStore } from './AuthStore';
import { UserContextType } from '../context/UserContext';

export class RootStore {
  authStore: AuthStore;
  profileStore: ProfileStore;
  orderStore: OrderStore;
  productStore: ProductStore;

  constructor(userContext: UserContextType) {
    this.authStore = new AuthStore(this, userContext);
    this.profileStore = new ProfileStore(this);
    this.orderStore = new OrderStore(this);
    this.productStore = new ProductStore(this);
  }
}

// Create an instance of RootStore
export const createRootStore = (userContext: UserContextType): RootStore => {
  return new RootStore(userContext);
};

// Define the RootStore type
export type RootStoreType = RootStore;
