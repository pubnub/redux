# PubNub Redux SDK

[![Build Status](https://travis-ci.com/pubnub/redux.svg?branch=master)](https://travis-ci.com/pubnub/redux)

The PubNub Redux SDK offers a data management framework that listens to realtime events generated by the PubNub network
to update the view inside your application. And of course, your data can coexist with PubNub-defined data.

The Redux SDK is an [`npm`](https://docs.npmjs.com/about-npm/) module that provides
Redux-specific functions which can be integrated with your existing or new Redux data store.

**Note**: This is a beta version of the PubNub Redux SDK

## Table of Contents

- [Concepts](#concepts)
- [Setup Instructions](#setup-instructions)
- [Usage Examples](#usage-examples)

# Concepts

The PubNub Redux SDK includes the following components that you help manage your application’s state and PubNub server communications.

- **Actions**: Preconfigured actions that correspond to PubNub internals 
- **Reducers**: Configured to respond to the actions dispatched by the PubNub Redux SDK
- **Listeners**: Monitor subscription notifications and dispatch actions
- **Commands**: Functions that execute PubNub API calls and dispatch actions

## Supported Features

- Sending and Receiving Messages
- Indicating User Presence
- Monitoring Network Status
- Managing User Data
- Managing Channel Data
- Managing Channel Memberships

## Not Yet Supported

- PubNub Access Manager
- Storage and Playback
- Signals
- Message Actions

## Dependencies

- `pubnub 4.28.3` or later
- `redux 4.0.4` or later
- `redux-thunk 2.3.0` or later

# Setup Instructions

This section provides the basic integration setps to connect the PubNub Redux SDK into your existing application. For an example
of an application built on top of this SDK, go to our reference application site at: https://www.pubnub.com/docs/chat/quickstart

- [Before You Begin](#before-you-begin)
- [Install the PubNub Redux libraries](#install-the-pubnub-redux-libraries)
- [Configure the Store](#configure-the-store)
- [Register Listeners](#register-listeners)

## Before You Begin

Before you can create an application with the PubNub Redux SDK, obtain a set of chat-optimized keys from your [PubNub Dashboard](https://dashboard.pubnub.com/).

In the following instructions, replace the following references with key values from your PubNub Dashboard.

- `myPublishKey`
- `mySubscribeKey`

## Install the PubNub Redux libraries

```bash
npm install redux
npm install redux-thunk
npm install pubnub
npm install pubnub-redux
```

## Configure the Store

A Redux application manages all application state in a centralized location called the **store**.
To gain the benefits offered by the PubNub Redux SDK, you must configure your store to include references to the PubNub libraries.

### Create the PubNub instance

```javascript
let pubnub = new Pubnub({
  publishKey: "myPublishKey",
  subscribeKey: "mySubscribeKey"
});
```

### Configure Reducers

```javascript
let rootReducer = combineReducers(
  createNetworkStatusReducer(false),
  createMessageReducer(),
  createPresenceReducer(),
  createUUIDMetadataReducer(),
  createUUIDMetadataListReducer(),
  createChannelMetadataReducer(),
  createChannelMetadataListReducer(),
  createMembershipReducer(),
  createChannelMembersReducer(),
);
```

### Configure Redux Thunk Middleware

The PubNub Redux SDK uses Redux Thunk to manage the interaction with commands that execute PubNub API calls, process the responses, and dispatch Redux actions.

```javascript
let thunkArgument = {
  pubnub: {
    api: pubnub
  }
};

let middleware = applyMiddleware(ReduxThunk.withExtraArgument(thunkArgument));
```

### Complete the Store Configuration

```javascript
let myStore = createStore(
  rootReducer,
  undefined,
  middleware,
);

```

## Register Listeners

You can register all the listeners that are included in the PubNub Redux SDK.

```javascript
pubnub.addListener(createPubnubListener(store.dispatch));
```

You can also choose to register only specific listeners and combine with other listeners in your application.

```javascript
pubnub.addListener(
  combineListeners(
    createNetworkStatusListener(store.dispatch),
    createMessageListener(store.dispatch),
    createPresenceListener(store.dispatch),
    // a custom listener
    {
      status: (status) => {
          console.log(status)
      }
    }
  )
);
```

# Usage Examples

This section contains a few examples of commands to get your started. This is not meant to be an exhaustive list.
Also, you can create commands in your application that use our actions to meet your requirements.

- [Sending a Message](#sending-a-message)
- [Set User Data](#set-user-data)
- [Fetch User Data](#fetch-user-data)
- [Set Channel Data](#set-channel-data)
- [Set Memberships](#set-memberships)

## Sending a Message

```javascript
dispatch(sendMessage({
  channel: 'my-channel',
  message: {
    title: 'hello world',
    body: 'This is our hello world message.'
  }
}));
```

## Set User Data

```javascript
dispatch(setUserData({
  uuid: 'my-user-id',
  data: {
    name: 'User Name'
  }
}));
```

## Fetch User Data

```javascript
dispatch(fetchUserData({
  uuid: 'my-user-id'
}));
```

## Set Channel Data

```javascript
dispatch(setChannelData({
  channel: 'my-channel-id',
  data: {
    name: 'Channel Name'
  }
}));
```

## Set Memberships

```javascript
dispatch(setMemberships({
  uuid: 'my-user-id',
  channels: [{
    id: 'channel-id'
  }]
}));
```
