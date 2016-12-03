exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user',function (table) {
      table.increments("id").primary();
      table.string("firstName",200);
      table.string("lastName",200);
      table.string("email",200);
      table.string("gender",10);
      table.string("photolink",200);
      table.string("facebookID",200);
      table.string('about', 500);
      table.string('hobby1', 200);
      table.string('hobby2', 200);
      table.string('hobby3', 200);
      table.string('flick1', 100);
      table.string('flick2', 100);
      table.string('flick3', 100);
      table.string('flick4', 100);
      table.string('read1', 100);
      table.string('read2', 100);
      table.string('read3', 100);
      table.string('read4', 100);
      table.string('stack1', 200);
      table.string('stack2', 200);
      table.string('stack3', 200);
      table.string('stack4', 200);
      table.string('github', 100);
      table.string('cohort', 100);
      table.string('city', 100);
      table.string('company', 100);
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
