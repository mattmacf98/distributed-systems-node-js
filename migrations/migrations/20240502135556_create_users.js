
module.exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.string('username', 24).unique().notNullable()
  });

  await knex('users')
      .insert([
          {username: 'mattmacf'},
          {username: 'steve'},
          {username: 'bob'}
      ])
};

module.exports.down = async (knex) => {
    knex.schema.dropTable('users');
};
