import {friendsData} from './friends-data';
import {FriendData} from '../../types/state';
import {mockFriend} from '../../mocks/mocks';
import { fetchCoachFriends, postFriend, deleteFriend } from '../api-actions/api-actions-friends';

describe('Reducer: friends', () => {
  let state: FriendData;

  beforeEach(() => {
    state = {
      friends: [],
      countFiends: 0,
      isCountDataLoading: false,
      isFriendsDataLoading: false,
      hasError: false,
      hasErrorPost: false,
      isFriendLoadDelete: false,
      isFriendLoadPost: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(friendsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
        isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
        isFriendLoadDelete: false, isFriendLoadPost: false});
  });

  describe('fetchCoachFriends test', () => {
    it('fetchCoachFriends fulfilled test', () => {
      const friends = Array.from({length: 5}, () => mockFriend());
      expect(friendsData.reducer(state, { type: fetchCoachFriends.fulfilled, payload: friends}))
        .toEqual({friends:friends, countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
    it('fetchCoachFriends rejected test', () => {
      expect(friendsData.reducer(state, { type: fetchCoachFriends.rejected.type }))
        .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: true, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
  });

  describe('postFriend test', () => {
    it('postFriend fulfilled test', () => {
      const friends = Array.from({length: 5}, () => mockFriend());
      const fakeFriend = mockFriend();
      expect(friendsData.reducer({...state, friends: friends} , {type: postFriend.fulfilled, payload: fakeFriend}))
        .toEqual({friends: [...friends, fakeFriend], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
    it('postFriend rejected test', () => {
      expect(friendsData.reducer(state, { type: postFriend.rejected.type }))
        .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: true,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
  });

  describe('deleteFriend test', () => {
    it('deleteFriend fulfilled test', () => {
      const friends = Array.from({length: 5}, () => mockFriend());
      const fakeFriend = mockFriend();
      const updFriends = friends.filter((friend) => friend.id !== fakeFriend.id);
      expect(friendsData.reducer({...state, friends: friends} , {type: deleteFriend.fulfilled, payload: fakeFriend}))
        .toEqual({friends: updFriends, countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
    it('deleteFriend rejected test', () => {
      expect(friendsData.reducer(state, { type: deleteFriend.rejected.type }))
        .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: true,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
  });
});
