const redisConnection = require('./js/redis-connection');
const redis = require('redis');
const client = redis.createClient();
const express = require('express');
let app = express();
const bluebird = require('bluebird');
const data = require('./data');
const structureData = data.structures;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

redisConnection.on('add-structure:request:*', (message, channel) => {
    
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;
    
    let structure  = message.data.structure;

    structureData.addStructure(structure.name, structure.slug, structure.description, structure.pagesize, structure.fields).then(response => {
        let successMessage = "Structure Added Successfully";
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: successMessage,
            eventName: eventName
        });
    }).catch(err => {
        let errorMessage = err.message
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: errorMessage,
            eventName: eventName
        });
    });
});

redisConnection.on('edit-structure:request:*', (message, channel) => {
    
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;
    
    let structure  = message.data.structure;

    structureData.editStructure(structure.name, structure.slug, structure.description, structure.pagesize, structure.fields).then(response => {
        let successMessage = "Structure Modified Successfully";
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: successMessage,
            eventName: eventName
        });
    }).catch(err => {
        let errorMessage = err.message
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: errorMessage,
            eventName: eventName
        });
    });
});

redisConnection.on('list-structures:request:*', (message, channel) => {
    
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    structureData.getAllStructures().then(response => {
        let successMessage = response;
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: successMessage,
            eventName: eventName
        });
    }).catch(err => {
        let errorMessage = err.message
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: errorMessage,
            eventName: eventName
        });
    });
});

redisConnection.on('delete-structure:request:*', (message, channel) => {
    
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let structure  = message.data.structure;

    structureData.deleteStructure(structure.slug).then(response => {
        let successMessage = "Structure Deleted Successfully";
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: successMessage,
            eventName: eventName
        });
    }).catch(err => {
        let errorMessage = err.message
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: errorMessage,
            eventName: eventName
        });
    });
});

redisConnection.on('add-structure-entry:request:*', (message, channel) => {
    
    let requestId = message.requestId;
    let eventName = message.eventName;

    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;

    let structure  = message.data.structure;

    structureData.addStructureEntries(structure.structureslug, structure.title, structure.slug, structure.blurb, structure.author, structure.createdDate, structure.fields).then(response => {
        let successMessage = "Entry Added Successfully";
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: successMessage,
            eventName: eventName
        });
    }).catch(err => {
        let errorMessage = err.message
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: errorMessage,
            eventName: eventName
        });
    });
});

const server = app.listen(3002, () => {
    console.log("Worker is running on http://localhost:3002");
});