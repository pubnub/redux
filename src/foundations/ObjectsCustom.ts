import Pubnub from 'pubnub';
import { UserData } from 'features/user/UserDataActions';
import { Channel } from 'features/channel/ChannelDataActions';

export type ObjectsCustom = Pubnub.ObjectCustom;

// helpers to get the custom type from complete objects
export type GetCustom<
  AnyMetadata extends Pubnub.v2ObjectData<ObjectsCustom>
> = NonNullable<AnyMetadata['custom']>;

export type GetUserCustom<
  UserDataType extends UserData<ObjectsCustom>
> = GetCustom<UserDataType>;
export type GetChannelCustom<ChannelDataType extends Channel> = GetCustom<
  ChannelDataType
>;
