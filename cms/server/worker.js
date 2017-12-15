const redisConnection = require("./js/redis-connection");
const redis = require("redis");
const client = redis.createClient();
const express = require("express");
let app = express();
const bluebird = require("bluebird");
const xss = require("xss");
const data = require("./data");
const structureData = data.structures;
const userData = data.users;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

redisConnection.on("add-structure:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let structure = message.data.structure;

  structureData
    .addStructure(
      xss(structure.name),
      xss(structure.slug),
      xss(structure.description),
      xss(structure.pagesize),
      structure.fields
    )
    .then(response => {
      let successMessage = "Structure Added Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("edit-structure:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let structure = message.data.structure;

  structureData
    .editStructure(
      xss(structure.name),
      xss(structure.slug),
      xss(structure.description),
      xss(structure.pagesize),
      structure.fields
    )
    .then(response => {
      let successMessage = "Structure Modified Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("list-structures:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  structureData
    .getAllStructures()
    .then(response => {
      let successMessage = response;
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("delete-structure:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let structure = message.data.structure;
  structureData
    .deleteStructure(xss(structure.slug))
    .then(response => {
      let successMessage = "Structure Deleted Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("add-entry:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let structure = message.data.structure;

  structureData
    .addStructureEntries(
      xss(structure.structureslug),
      xss(structure.title),
      xss(structure.slug),
      xss(structure.blurb),
      xss(structure.author),
      xss(structure.createdDate),
      structure.fields
    )
    .then(response => {
      let successMessage = "Entry Added Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("update-entry:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let structure = message.data.structure;

  structureData
    .editStructureEntries(
      xss(structure.structureslug),
      xss(structure.title),
      xss(structure.slug),
      xss(structure.blurb),
      xss(structure.author),
      structure.fields
    )
    .then(response => {
      let successMessage = "Entry Updated Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("list-all-structures:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  structureData
    .getAllStructuresFromCollection()
    .then(response => {
      let successMessage = response;
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("list-entries-by-slug:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let structure = message.data.structure;

  structureData
    .getAllEntriesByStructureSlugName(xss(structure.slug))
    .then(response => {
      let successMessage = response;
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("delete-entry:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let entry = message.data.entry;

  structureData
    .removeEntry(xss(entry.slug))
    .then(response => {
      let successMessage = "Entry Deleted Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("add-user:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let user = message.data.user;
  userData
    .addUser(
      xss(user.firstName),
      xss(user.lastName),
      xss(user.userName),
      xss(user.password),
      xss(user.biography)
    )
    .then(response => {
      let successMessage = "User Added Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("list-users:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  userData
    .getAllUsers()
    .then(response => {
      let successMessage = response;
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("update-user:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let user = message.data.user;
  userData
    .updateUser(user.id)
    .then(response => {
      let successMessage = response;
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
      redisConnection.emit(failedEvent, {
        requestId: requestId,
        data: errorMessage,
        eventName: eventName
      });
    });
});

redisConnection.on("add-comment:request:*", (message, channel) => {
  let requestId = message.requestId;
  let eventName = message.eventName;

  let successEvent = `${eventName}:success:${requestId}`;
  let failedEvent = `${eventName}:failed:${requestId}`;

  let entry = message.data.entry;
  structureData.
    addCommentsByEntrySlug(
      xss(entry.slug),
      xss(entry.comment)
    )
    .then(response => {
      let successMessage = "Comment Added Successfully";
      redisConnection.emit(successEvent, {
        requestId: requestId,
        data: successMessage,
        eventName: eventName
      });
    })
    .catch(err => {
      let errorMessage = err.message;
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
