import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Order} from '../../types/order';


export const getOrders = (state: State): Order[] => state[NameSpace.Orders].orders;
export const getCountOrders = (state: State): number => state[NameSpace.Orders].countOrders;
export const getOrdersDataLoadingStatus = (state: State): boolean => state[NameSpace.Orders].isOrdersDataLoading;
export const getOrdersUserLoadingStatus = (state: State): boolean => state[NameSpace.Orders].isOrdersCreateUserLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Orders].hasError;
export const getErrorPost = (state: State): boolean => state[NameSpace.Orders].hasErrorPost;
export const getLoadingPost = (state: State): boolean => state[NameSpace.Orders].isPostLoading;
export const getOrder = (state: State): Order | null => state[NameSpace.Orders].order;
export const getOrderLoadingStatus = (state: State): boolean => state[NameSpace.Orders].isOrderDataLoading;
