import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
    chats: 
*/

const messageBatchSize = 25;
const dataTypes = ['chat', 'messageBatch', 'message'];

//Returns localId for given backend ID;
function getLocalId(id, dataInfo) {
    if (dataInfo.name === 'chat') {
        return 'chat' + id;
    }
    else if (dataInfo.name === 'messageBatch') {
        return 'messageBatch' + dataInfo.chatId + id;
    }
    else if (dataInfo.name === 'message') {
        return 'message' + dataInfo.chatId + dataInfo.messageBatchIndex + id;
    }
}

//Returns chatHeader from local storage for given backend chatId;
function getChatHeader(chatId) {
    const dataInfo = {name: 'chat'};
    const localId = getLocalId(chatId, dataInfo);

    AsyncStorage.getItem(localId).then(chatHeader => {

        //Check if chatHeader exists.
        if (chatHeader != null) {
            return JSON.parse(chatHeader);
        }
        else {
            return null;
        }
    })
}

function createChatHeader(chatId, messageInfo) {
    const dataInfo = {name: 'chat'};
    const localId = getLocalId(chatId, dataInfo);

    const messageBatchId = createMessageBatch(chatId, 0, messageInfo)

     //Creating new chatHeader.
     const newChatHeader = {
        id: localId,
        batchIds: [messageBatchId],
        batchCount: 1,
        lastBatchSize: 1,
    }
    let jsonValue = JSON.stringify(newChatHeader);

    //Saving new chatHeader
    AsyncStorage.setItem(localId, jsonValue)
    .then(() => {
        return newChatHeader;
    })
    .catch(error => {
        console.log(error);
    });
}

//Message batch functions.

function getMessageBatch(batchIndex, chatId) {
    const dataInfo = {name: 'messageBatch', chatId: chatId};
    const localId = getLocalId(batchIndex, dataInfo);

    AsyncStorage.getItem(localId).then(messageBatch => {

        //Check if messageBatch exists.
        if (messageBatch != null) {
            return JSON.parse(messageBatch);
        }
        else {
            return null;
        }
    })
}

function createMessageBatch(chatId, batchIndex, messageInfo) {
    const dataInfo = {name: 'messageBatch', chatId: chatId};
    const localId = getLocalId(batchIndex, dataInfo);

    //Creating new message.
    const messageId = createMessage(chatId, batchIndex, 0, messageInfo);

    //Creating new messageBatch object.
    const newMessageBatch = {
        id: localId,
        messageIds: [messageId],
        messageCount: 1,
    }
    let jsonValue = JSON.stringify(newMessageBatch);

    //Saving new messageBatch.
    AsyncStorage.setItem(localId, jsonValue)
    .then(() => {
        return localId;
    })
    .catch(error => {
        console.log(error);
    });
}

//Message functions.

function createMessage(chatId, messageBatchIndex, messageIndex, messageInfo) {
    const dataInfo = {name: 'message', chatId, messageBatchIndex}
    const localId = getLocalId(messageIndex, dataInfo);
    const newMessage = {
        id: messageIndex,
        timestamp: Date.now(),
        ...messageInfo
    }
    const jsonValue = JSON.stringify(newMessage);

    AsyncStorage.setItem(localId, jsonValue).then(() => {
        return localId;
    })
    .catch(error => {
        console.log(error);
    });
}

function saveMessage(chatId, messageInfo) {
    let chatHeader;
    chatHeader = getChatHeader(chatId);
    if (chatHeader) {
        let messageBatchId, messageBatch;
        if (chatHeader.batchCount > 0) {
            let batchIndex = chatHeader.batchCount - 1;
            messageBatch = getMessageBatch(batchIndex, chatId);
            if (messageBatch.messageCount < messageBatchSize) {
                const messageIndex = messageBatch.messageCount;
                const messageId = createMessage(chatId, batchIndex, messageIndex, messageInfo);
                messageBatch.messageCount = messageBatch.messageCount + 1;
                messageBatch.messageIds.push(messageId);
                AsyncStorage.setItem(messageBatch.id, messageBatch)
                messageBatchId = messageBatch.id;
            }
            else {
                batchIndex = chatHeader.batchCount;
                messageBatchId = createMessageBatch(chatId, batchIndex, messageInfo);
            }
            chatHeader.batchCount = chatHeader.batchCount + 1;
            chatHeader.batchIds.push(messageBatchId);
            AsyncStorage.setItem(chatHeader.id, chatHeader);
        }
    }
    else {
        createChatHeader(chatId, messageInfo);
    }
}

export {saveMessage};