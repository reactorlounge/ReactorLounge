exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user',function (table) {
      table.increments("id").primary();
      table.string("username",200);
      table.string("firstName",200);
      table.string("lastName",200);
      table.string("email",200);
      table.string("gender",10);
      table.string("photolink",200);
      table.string("facebookID",200);
			table.integer('age',3);
  	}).then(function () {
  		console.log("Created User Table")
  	}),

  	knex.schema.createTable("messages",function (table) {
  		table.increments("id").primary()
  		table.string("content",200);
      table.integer("likes");
			table.string("firstName",200);
      table.string("lastName",200);
      table.string("photolink",200);
      table.string("msgImageUrl", 200);
			table.timestamp("created_at");
  	}).then(function(){
  		console.log("Created Message Table")
  	}),

    knex.schema.createTable("comments",function (table) {
      table.increments("id").primary()
      table.string("content",200);
      table.integer("likes");
      table.string("firstName",200);
      table.string("lastName",200);
      table.string("photolink",200);
      table.integer('msgId',11);
      table.timestamp("created_at");
    }).then(function(){
      console.log("Created Comments Table")
  	}),

    knex.schema.createTable("sessions",function (table) {
      table.increments("id").primary()
      table.string("sessionId");
      table.integer('userId',11).unsigned().references('id').inTable('user');
    }).then(function () {
      console.log("Created Sessions Table");
    }),

    knex.schema.createTable("questions",function(table){
    	table.increments("id").primary()
    	table.string("Content");
      table.string("firstName",200);
      table.string("lastName",200);
      table.string("photolink",200);
      table.string("msgImageUrl", 200);
      table.timestamp("created_at")
    }).then(function () {
    	console.log("Created questions table");
    }),

    knex.schema.createTable("answers",function(table){
    	table.increments("id").primary()
    	table.string("Answer");
      table.string("firstName",200);
      table.string("lastName",200);
      table.string("photolink",200);
    	table.integer("qid"); 
      table.integer("likes");
       table.timestamp("created_at");

    }).then(function () {
    	console.log("Created answer table");
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable("user"),
    knex.schema.dropTable("comments"),
  	knex.schema.dropTable("messages"),
    knex.schema.dropTable("sessions"),
    knex.schema.dropTable("answers"),
    knex.schema.dropTable("questions")
  ])

};
