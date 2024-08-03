/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { configure, makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { RootStore } from './RootStore';

configure({ enforceActions: 'always' });

interface Profile {
  name?: string;
  age?: number;
}

export class ProfileStore {
  profile: Profile = {};
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setProfile(profile: Profile) {
    try {
    } catch (error: any) {
    } finally {
    }
    this.profile = profile;
  }
}
